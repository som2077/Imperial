/**
 * GitHub Collaborator Provisioner Service
 *
 * Automatically invites licensed customers as read-only collaborators
 * to the official repository upon successful purchase or claim.
 */

export interface InviteResult {
  success: boolean;
  status?: "invited" | "already_collaborator" | "simulated";
  inviteId?: number;
  message?: string;
  error?: string;
}

export async function inviteGitHubCollaborator(
  username: string,
  options?: {
    owner?: string;
    repo?: string;
    permission?: "pull" | "triage" | "push";
  }
): Promise<InviteResult> {
  const cleanUsername = username.trim().replace(/^@/, "");
  if (!cleanUsername) {
    return { success: false, error: "GitHub username is required" };
  }

  const token = process.env.GITHUB_ACCESS_TOKEN;
  const owner = options?.owner || process.env.GITHUB_OWNER || "som2077";
  const repo = options?.repo || process.env.GITHUB_REPO || "saas-kit-template";
  const permission = options?.permission || "pull"; // Read-only collaborator

  // Development simulation fallback
  if (!token || token === "ghp_dummy" || process.env.NODE_ENV === "test") {
    console.log("----------------------------------------");
    console.log(`🐙 [GitHub Invite Simulated] User: @${cleanUsername}`);
    console.log(`📦 Target Repository: ${owner}/${repo} (Permission: ${permission})`);
    console.log("----------------------------------------");
    return {
      success: true,
      status: "simulated",
      message: `Simulated invitation for @${cleanUsername} to ${owner}/${repo}`,
    };
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${encodeURIComponent(cleanUsername)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "SAAS-Kit-License-Automation",
      },
      body: JSON.stringify({ permission }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return {
        success: true,
        status: "invited",
        inviteId: data.id,
        message: `Successfully invited @${cleanUsername} to ${owner}/${repo}`,
      };
    }

    if (response.status === 204) {
      return {
        success: true,
        status: "already_collaborator",
        message: `@${cleanUsername} is already a collaborator on ${owner}/${repo}`,
      };
    }

    if (response.status === 404) {
      return {
        success: false,
        error: `GitHub user @${cleanUsername} does not exist. Please double-check your GitHub username.`,
      };
    }

    const errData = await response.json().catch(() => ({}));
    return {
      success: false,
      error:
        errData.message ||
        `GitHub API returned status ${response.status} when inviting @${cleanUsername}`,
    };
  } catch (error: unknown) {
    console.error("Failed to invite GitHub collaborator:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Network error while connecting to GitHub API",
    };
  }
}
