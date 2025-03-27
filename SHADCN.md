# shadcn/ui Components Documentation

This project uses both shadcn/ui and Radix UI components. shadcn/ui provides pre-styled components built on top of Radix UI primitives.

## Installation

We have shadcn/ui installed alongside Radix UI. The components are located in:

```
src/components/ui/     # shadcn/ui components
src/components/shared/ # custom components
```

## Available Components

### Currently Installed

- Button (`@/components/ui/button`)
- Card (`@/components/ui/card`)
- Dialog (`@/components/ui/dialog`)

### Adding New Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add [component-name]
```

Available components: [shadcn/ui Components](https://ui.shadcn.com/docs/components)

## Usage Example

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card Description</Card.Description>
      </Card.Header>
      <Card.Content>
        <Button variant="default">Click Me</Button>
      </Card.Content>
    </Card>
  );
}
```

## Styling

We use the default shadcn/ui styling with Tailwind CSS. Custom styles can be added in:

```
src/app/globals.css
```

## Utility Functions

shadcn/ui utilities are available in:

```
src/lib/utils.ts
```

Key utilities include:

- `cn()` for conditional class names

## Theme Customization

Theme configuration is in:

```
tailwind.config.js
```

Colors and other design tokens can be modified here.

## Using with Radix

This project maintains both shadcn/ui and Radix UI components. Example of using both:

```tsx
import { Button } from "@/components/ui/button"; // shadcn/ui
import * as Dialog from '@radix-ui/react-dialog'; // Radix

export function HybridExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <h2>Dialog Content</h2>
      </Dialog.Content>
    </Dialog.Root>
  );
}
```

## Best Practices

1. **Component Selection**

   - Use shadcn/ui for pre-styled components
   - Use Radix UI for custom-styled components
   - Mix both when needed (e.g., shadcn/ui Button inside Radix Dialog)

2. **Styling**

   - Use Tailwind classes for minor adjustments
   - Create custom variants in component files
   - Maintain consistent theming

3. **Updates**
   - Check [shadcn/ui](https://ui.shadcn.com) for new components
   - Update components individually as needed
   - Test thoroughly after updates

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## Contributing

When adding new shadcn/ui components:

1. Document them in this file
2. Add usage examples
3. Update any relevant tests
4. Consider accessibility implications
