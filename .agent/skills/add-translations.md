---
name: add-translations
description: Add internationalized translation strings and dictionary keys across all 5 supported languages.
---

# Skill: Add Translations & i18n Keys

This skill guides an AI agent through adding localized text across the application.

## 1. Supported Languages

The starter kit strictly maintains 5 dictionaries:

- `en` (English) - Master schema
- `es` (Spanish)
- `de` (German)
- `fr` (French)
- `hi` (Hindi)

## 2. Update English Dictionary First (`src/lib/i18n/dictionaries/en.ts`)

The TypeScript type `Dictionary` is inferred from `en.ts`:

```ts
export const en = {
  // ... existing sections
  myFeature: {
    title: "Project Management",
    createTask: "Create Task",
    emptyState: "No tasks found yet.",
  },
};
```

## 3. Update Remaining 4 Dictionaries

Maintain key symmetry across `es.ts`, `de.ts`, `fr.ts`, and `hi.ts`:

- `es.ts`: `myFeature: { title: "Gestión de Proyectos", createTask: "Crear Tarea", emptyState: "No se encontraron tareas aún." }`
- `de.ts`: `myFeature: { title: "Projektmanagement", createTask: "Aufgabe Erstellen", emptyState: "Noch keine Aufgaben gefunden." }`
- `fr.ts`: `myFeature: { title: "Gestion de Projet", createTask: "Créer une Tâche", emptyState: "Aucune tâche trouvée pour le moment." }`
- `hi.ts`: `myFeature: { title: "परियोजना प्रबंधन", createTask: "कार्य बनाएं", emptyState: "अभी तक कोई कार्य नहीं मिला।" }`

## 4. Consuming in Code

- **Server Components**:
  ```tsx
  import { getServerDictionary } from "@/lib/i18n/server";
  const { dictionary } = await getServerDictionary();
  return <h1>{dictionary.myFeature.title}</h1>;
  ```
- **Client Components**:
  ```tsx
  "use client";
  import { useI18n } from "@/lib/i18n/context";
  const { dictionary } = useI18n();
  return <button>{dictionary.myFeature.createTask}</button>;
  ```
