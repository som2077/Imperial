"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganizationAction } from "@/server/actions/team";
import { Building2, Check, ChevronsUpDown, Plus, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface OrganizationItem {
  id: string;
  name: string;
  slug: string;
}

interface WorkspaceSwitcherProps {
  initialOrganizations: OrganizationItem[];
  defaultOrgId?: string;
}

export function WorkspaceSwitcher({ initialOrganizations, defaultOrgId }: WorkspaceSwitcherProps) {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<OrganizationItem[]>(initialOrganizations);
  const [selectedOrgId, setSelectedOrgId] = useState<string>(
    defaultOrgId || (initialOrganizations[0]?.id ?? "personal")
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const currentOrg = organizations.find((o) => o.id === selectedOrgId) || organizations[0];

  const handleSelectWorkspace = (org: OrganizationItem) => {
    setSelectedOrgId(org.id);
    toast.success(`Switched to ${org.name}`);
    router.refresh();
  };

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    setIsCreating(true);
    const formData = new FormData();
    formData.append("name", newOrgName.trim());

    try {
      const res = await createOrganizationAction(formData);
      if (res.error) {
        toast.error(res.error);
      } else if (res.organization) {
        setOrganizations((prev) => [...prev, res.organization]);
        setSelectedOrgId(res.organization.id);
        setIsDialogOpen(false);
        setNewOrgName("");
        toast.success(`Workspace "${res.organization.name}" created!`);
        router.refresh();
      }
    } catch {
      toast.error("Failed to create workspace.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:bg-accent/60 flex w-full items-center justify-between gap-2 rounded-xl border p-2 text-left transition-colors">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                {currentOrg ? <Building2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-semibold">
                  {currentOrg?.name || "Personal Workspace"}
                </p>
                <p className="text-muted-foreground truncate text-[10px]">
                  {currentOrg ? "Organization" : "Personal"}
                </p>
              </div>
            </div>
            <ChevronsUpDown className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-60" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
            Workspaces & Teams
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {organizations.length === 0 ? (
            <DropdownMenuItem disabled className="text-muted-foreground text-xs">
              Personal Workspace
            </DropdownMenuItem>
          ) : (
            organizations.map((org) => {
              const isSelected = org.id === selectedOrgId;
              return (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => handleSelectWorkspace(org)}
                  className="flex cursor-pointer items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Building2 className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{org.name}</span>
                  </div>
                  {isSelected && <Check className="text-primary h-3.5 w-3.5 shrink-0" />}
                </DropdownMenuItem>
              );
            })
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="text-primary cursor-pointer gap-2 text-xs font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create New Workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Organization Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Organization Workspace</DialogTitle>
            <DialogDescription>
              Organize projects, manage team members, and configure separate billing.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateOrg} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="org-name" className="text-xs font-semibold">
                Workspace Name
              </Label>
              <Input
                id="org-name"
                placeholder="e.g. Acme Corp, Engineering, Marketing"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                autoFocus
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isCreating || !newOrgName.trim()}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
