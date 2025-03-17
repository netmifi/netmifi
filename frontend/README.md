# React + TypeScript + Vite + Shadcn Ui

The Frontend directory of our application renders the client view of the system. Our UI is powered by Vercel's Shadcn no need to reinvent the wheel.


## Folder Naming Conventions

- **Lowercase Only:** All folder names must be in lowercase.
- **Snake Case:** Use snake_case (i.e., separate words using underscores) for folder names.  
  _Example: use `my_dashboard` instead of `MyDashboard` or `myDashboard` or `my-dashboard`._

---

## Components Directory Guidelines

### Directory Structure and Organization

- **Purpose-specific Directories:**  
  Each directory inside the `components` folder should represent a specific subject or a collection of components that are closely related. This means:
  - **Reusable Components:** Create a folder if the components are meant to be reused by a specific page or layout.  
    _Example: a directory named `header` or `footer` that holds components specific to those sections._
  - **Grouped Components:** If you have a collection of similar components that work together (for example, different parts of a form), group them in a dedicated folder (e.g., `form`).

- **Global Components:**  
  If a component is designed to be used across multiple use cases or pages that are not tied to a specific subject, it should be placed directly in the root of the `components` directory rather than nested inside a subfolder.  
  _Example: a generic `button` component used in various contexts should reside in the root of the `components` folder._

- **Exception – Collections:**  
  The only exception to placing components in the root is when you have a collection of similar components that naturally belong together. In such cases, grouping them in a dedicated folder is acceptable.

---

By following these guidelines, you'll ensure a clean and maintainable project structure that makes it easier for everyone to understand where to find and how to organize the components in your frontend application.


## ARCHITECTURE

### Frontend (React + TypeScript)
The frontend is built with React and TypeScript, bundled with Vite for a fast development experience. Use the alias `@` to reference the `src` folder for cleaner imports. Key libraries and tools used include:
- **Tailwind CSS:** Utility-first CSS framework. [Tailwind CSS Website](https://tailwindcss.com/)
- **shadcn UI:** Pre-built UI components stored in the `components/ui` folder.  
  *Note:* The shadcn components are stored in the `components/ui` directory and help streamline your UI development. More details can be found in the [shadcn UI Documentation](https://ui.shadcn.com/).
- **Zod:** For schema validation. [Zod on GitHub](https://github.com/colinhacks/zod)
- **Axios:** For making HTTP requests. [Axios Documentation](https://axios-http.com/)
- **TanStack Query:** For managing server state. [TanStack Query](https://tanstack.com/query/latest)
- **Additional Tools and Libraries:**
  - **TanStack Query Devtools:** For debugging query states.
  - **Lucide React:** Icon library. [Lucide Icons](https://lucide.dev/)
  - **Font Awesome:** Icon toolkit. [Font Awesome](https://fontawesome.com/)
  - **React Hook Form:** For handling form state. [React Hook Form](https://react-hook-form.com/)
  
```markdown
# Styling & Tailwind Configuration Overview

This document explains how our custom CSS in `index.css` works together with our Tailwind CSS configuration (`tailwind.config.js`). We leverage shadcn's CSS variable feature to create a unified design system, allowing us to control fonts, colors, and other design tokens centrally.

---

## index.css Explained

The `index.css` file serves as the primary entry point for styling. It performs several important tasks:

1. **Importing Tailwind Directives:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   These lines import Tailwind’s base styles, component classes, and utility classes. This inclusion ensures that Tailwind's preflight, components, and utilities are available throughout the project.

2. **Custom Font Definitions:**
   We define custom fonts using the `@font-face` rule so that they are available for both development and production:
   ```css
   @font-face {
     font-family: "Dancing Script";
     src: url(./assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf);
   }
   @font-face {
     font-family: "Dm Sans";
     src: url(./assets/fonts/DM_Sans/DMSans-Regular.ttf);
   }
   @font-face {
     font-family: "Montserrat";
     src: url(./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf);
   }
   @font-face {
     font-family: "Poppins";
     src: url(./assets/fonts/Poppins/Poppins-Regular.ttf);
   }
   ```

3. **Global Styles & CSS Variable Initialization:**
   Inside the `@layer base` block, we set default styles and initialize a set of CSS variables that act as design tokens:
   ```css
   @layer base {
     * {
       @apply border-border font-dm-sans;
       scrollbar-width: thin;
     }
     body {
       @apply bg-background text-foreground;
     }
     :root {
       --background: 0 0% 97.3%;
       --foreground: 222.2 84% 4.9%;
       /* More variables for colors, borders, rings, etc. */
       --radius: 0.5rem;
       /* ... additional variables for themes and UI elements ... */
     }
     .dark {
       /* Override variables for dark mode */
       --background: 222.2 84% 5.2%;
       --foreground: 210 40% 98%;
       /* ... other dark mode overrides ... */
     }
     /* Responsive typography using Tailwind's utility classes */
     h1 { @apply text-4xl; }
     h2 { @apply text-3xl; }
     h3 { @apply text-2xl; }
     h4 { @apply text-xl; }
   }
   ```
   These CSS variables (like `--background`, `--foreground`, etc.) are used throughout the project to ensure a consistent color scheme and design language. The `.dark` class provides an easy way to switch to dark mode by overriding these variables.

---

## tailwind.config.js Explained

The Tailwind configuration file customizes the utility framework to work seamlessly with our defined CSS variables and custom fonts.

1. **Content Paths & Dark Mode:**
   ```js
   module.exports = {
     darkMode: ["class"],
     content: [
       "./pages/**/*.{js,jsx,ts,tsx}",
       "./components/**/*.{js,jsx,ts,tsx}",
       "./app/**/*.{js,jsx,ts,tsx}",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
   ```
   The `content` array specifies where Tailwind should look for class names, and `darkMode: ["class"]` tells Tailwind to use the `.dark` class for enabling dark mode.

2. **Theme Customization:**
   Under `theme.extend`, we map our CSS variables and custom fonts to Tailwind’s utility classes:
   
   - **Font Families:**
     ```js
     extend: {
       fontFamily: {
         'dm-sans': ["Dm Sans", "sans-serif"],
         poppins: ["Poppins", "sans-serif"],
         montserrat: ["Montserrat", "sans-serif"],
         'dancing-script': ["Dancing Script", "cursive"]
       },
     ```
     These entries correlate with the fonts defined via `@font-face` in `index.css`. You can apply these fonts using Tailwind classes like `font-dm-sans`.

   - **Colors:**
     ```js
       colors: {
         background: 'hsl(var(--background))',
         foreground: 'hsl(var(--foreground))',
         border: 'hsl(var(--border))',
         input: 'hsl(var(--input))',
         ring: 'hsl(var(--ring))',
         /* Other colors mapping to CSS variables */
         red: {
           DEFAULT: 'hsl(var(--red))',
           foreground: 'hsl(var(--red-foreground))'
           // the color with -foreground extension shows the opposite of the default color
         },
         // Additional color configurations follow the same pattern.
       },
     ```
     Each color is set using the HSL notation that references a corresponding CSS variable. This linkage means that any change to a variable in `index.css` (e.g., when toggling dark mode) will be automatically reflected in the utility classes generated by Tailwind.

   - **Other Extensions:**
     The config also defines custom border radii, keyframes, and animations to match our design tokens:
     ```js
       borderRadius: {
         lg: 'var(--radius)',
         md: 'calc(var(--radius) - 2px)',
         sm: 'calc(var(--radius) - 4px)'
       },
       keyframes: { /* Custom keyframes */ },
       animation: { /* Custom animations */ },
     ```
   
3. **Plugins:**
   The configuration imports additional plugins, such as:
   ```js
     plugins: [require("tailwindcss-animate")],
   };
   ```
   This plugin adds animation utilities to further enhance our UI capabilities.

---

## How index.css and tailwind.config.js Connect

- **Unified Design Tokens:**  
  The `index.css` file initializes CSS variables for colors, fonts, and other design elements. The `tailwind.config.js` file then references these variables to generate utility classes (e.g., `bg-background` translates to the HSL value of `var(--background)`).

- **Font Integration:**  
  Custom fonts declared in `index.css` are linked to Tailwind’s `fontFamily` settings in the configuration file. This connection allows you to use classes like `font-dm-sans` throughout your application.

- **Dynamic Theming:**  
  By setting up variables in `:root` and overriding them in the `.dark` class in `index.css`, you can easily switch themes. The Tailwind config leverages these same variables, ensuring that all utility classes adapt to theme changes automatically.

- **Consistent Styling Across Development & Production:**  
  This approach centralizes design decisions. Any update in the `index.css` variable values will be reflected across all Tailwind-generated classes, ensuring consistency in your app’s look and feel.

---

This setup creates a powerful, flexible, and maintainable styling framework that marries custom CSS with Tailwind’s utility-first approach. It provides a unified system for managing fonts, colors, and other design tokens, which simplifies theming and design updates across your project.
```

Here’s the updated README with the new rule about the `types/index.d.ts` file:  

```markdown
# Frontend Folder README

This README provides an overview of our styling configuration (using `index.css` and `tailwind.config.js`) as well as the naming conventions for files and directories within our frontend project. We leverage shadcn's CSS variable feature to create a unified design system, allowing centralized control over fonts, colors, and other design tokens.

---

## Styling & Tailwind Configuration Overview

### index.css Explained

- **Tailwind Directives:**  
  The file begins by importing Tailwind’s base, components, and utilities:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  This inclusion provides access to Tailwind's preflight styles and utility classes.

- **Custom Font Definitions:**  
  Custom fonts are defined using `@font-face` so they’re available in both development and production:
  ```css
  @font-face {
    font-family: "Dancing Script";
    src: url(./assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: "Dm Sans";
    src: url(./assets/fonts/DM_Sans/DMSans-Regular.ttf);
  }
  @font-face {
    font-family: "Montserrat";
    src: url(./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: "Poppins";
    src: url(./assets/fonts/Poppins/Poppins-Regular.ttf);
  }
  ```

- **Global Styles & CSS Variable Initialization:**  
  Within the `@layer base` block, global styles are applied and CSS variables (design tokens) are initialized:
  ```css
  @layer base {
    * {
      @apply border-border font-dm-sans;
      scrollbar-width: thin;
    }
  
    body {
      @apply bg-background text-foreground;
    }
  
    :root {
      --background: 0 0% 97.3%;
      --foreground: 222.2 84% 4.9%;
      /* Additional variables for colors, borders, rings, etc. */
      --radius: 0.5rem;
      /* ... more variables for UI elements ... */
    }
  
    .dark {
      /* Dark mode variable overrides */
      --background: 222.2 84% 5.2%;
      --foreground: 210 40% 98%;
      /* ... other dark mode overrides ... */
    }
  
    /* Responsive typography */
    h1 { @apply text-4xl; }
    h2 { @apply text-3xl; }
    h3 { @apply text-2xl; }
    h4 { @apply text-xl; }
  }
  
  #root {
    @apply w-full;
  }
  
  @layer components {
    .max-container {
      /* Additional container styling can be applied here */
    }
  }
  ```

### tailwind.config.js Explained

- **Content & Dark Mode:**  
  Tailwind is configured to scan specific folders for class names, and dark mode is enabled via a `.dark` class:
  ```js
  module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  ```
  
- **Theme Customization:**  
  Under `theme.extend`, our custom fonts and colors (linked to CSS variables) are defined:
  
  - **Font Families:**
    ```js
    extend: {
      fontFamily: {
        'dm-sans': ["Dm Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        'dancing-script': ["Dancing Script", "cursive"]
      },
    ```
    These match the fonts declared in `index.css`, allowing usage via classes like `font-dm-sans`.

  - **Colors:**  
    Colors are defined using HSL values that reference our CSS variables, ensuring dynamic theming:
    ```js
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        red: {
          DEFAULT: 'hsl(var(--red))',
          foreground: 'hsl(var(--red-foreground))'
        },
        /* Additional color configurations follow the same pattern */
      },
    ```

  - **Other Extensions:**  
    Custom border radii, keyframes, and animations are also defined to align with our design tokens:
    ```js
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: { /* Custom keyframes definitions */ },
      animation: { /* Custom animation definitions */ },
    ```

- **Plugins:**  
  Additional plugins such as `tailwindcss-animate` are included to extend Tailwind’s capabilities:
  ```js
    plugins: [require("tailwindcss-animate")],
  };
  ```

### How index.css and tailwind.config.js Connect

- **Unified Design Tokens:**  
  The CSS variables defined in `index.css` (e.g., `--background`, `--foreground`) are referenced in the Tailwind configuration. This ensures that any change in these variables (like during dark mode toggling) automatically updates all Tailwind-generated utility classes.

- **Font Integration:**  
  Custom fonts declared via `@font-face` in `index.css` are linked to Tailwind’s `fontFamily` settings. This lets you apply these fonts using Tailwind classes (e.g., `font-dm-sans`).

- **Dynamic Theming:**  
  By establishing variables in `:root` and providing dark mode overrides in the `.dark` class, our Tailwind utilities adapt dynamically, ensuring consistent theming across the application.

---

## File & Folder Naming Conventions

To maintain a well-organized codebase, please adhere to the following naming conventions:

### Folder Naming
- **Lowercase & Snake Case:**  
  All folder names should be in lowercase and use snake_case (e.g., `user_profile`).

- **Components Directory Structure:**  
  - Each directory inside the `components` folder should represent a specific subject or collection of related, reusable components.
  - **Subject-specific Folders:** If a folder groups components that are used for a specific page, layout, or functionality (e.g., a `form` folder), it should be clearly dedicated to that subject.
  - **Global Reusable Components:** If a component is used across multiple, unrelated pages, it should reside in the root of the `components` folder rather than nested within a subject-specific directory.

### File Naming
- **Hooks:**  
  Files that implement hooks should use **camelCase** naming.  
  _Example: `useFetchData.js` or `useAuth.ts`._

- **Components & Pages:**  
  Files for components and pages should follow the **PascalCase** naming convention.  
  _Example: `UserProfile.jsx` or `LoginPage.tsx`._

- **Allowed Exceptions:**  
  The naming conventions above do not apply to:
  - The `index` file.
  - Any file located in the `lib` folder.

---

## Type Definition Rules

- The `types/index.d.ts` file **must not** contain any `import` or `export` statements.
- All types defined in this file should be **global** so that other files do not require explicit type imports.
- Example:
  ```ts
  declare interface  UserSchemaDocument = {
      id: string;
      name: string;
      email: string;
    };
  ```
- This ensures that TypeScript can automatically recognize these types across the project without explicit imports.

Following these guidelines ensures that our project remains consistent, maintainable, and easy to navigate.
```


---

## Environment Variables Naming Convention

To maintain consistency and avoid conflicts, all environment variables in the frontend **must** follow this naming convention:

- **Naming Pattern:**  
  Environment variable names should always be prefixed with `VITE_`.  
  _Example:_  
  ```env
  VITE_API_URL=https://api.example.com
  VITE_AUTH_TOKEN=your-secret-token
  ```

- **How to Import Environment Variables in Code:**  
  When using environment variables in the frontend, access them via `import.meta.env`:
  ```ts
  const apiUrl = import.meta.env.VITE_API_URL;
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  ```

- **Why Prefix with `VITE_`?**  
  Vite requires all environment variables to be prefixed with `VITE_` to be accessible in the frontend. Without this prefix, the variables will not be exposed to the client-side code.

---
```

This ensures everyone on the team follows a uniform structure for environment variables. Let me know if you'd like any modifications! 🚀
```
---
## <div style="color: red;">For any references  please visit the [APPLICATION STRUCTURE](./app-structure.txt)
</div>