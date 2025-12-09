## Top-down view
- Goal: make the Radix Select dropdown match the trigger’s full width instead of shrinking to the width of its items.
- Scope: shared Select component only (`src/components/ui/select.tsx`); no consumer changes.
- Result: dropdown content and viewport now honor the trigger width (with a 100% fallback) via explicit styles plus `w-full` classes, so the menu aligns with the trigger in all cases.

## Step-by-step changes (entry-level friendly)
1) File touched: `src/components/ui/select.tsx`.
2) Updated `SelectContent` styles: removed the small `min-w-[8rem]`, kept `w-full/min-w-full`, and added inline `style` for `width`/`minWidth` set to `var(--radix-select-trigger-width, 100%)` so it uses the trigger width or falls back to 100%.
3) Updated `SelectPrimitive.Viewport` styles: kept `w-full/min-w-full`, added matching inline `style` `width`/`minWidth` using the same CSS variable with a 100% fallback to prevent the inner viewport from shrinking.
4) Left everything else (options, animations, spacing) untouched; only the width behavior changed.
