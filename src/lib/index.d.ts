// =======================================
// Compose Svelted – Public API (Core V2)
// =======================================

import type { SvelteComponent } from "svelte";

export class NavHost extends SvelteComponent {}

// ---------- TS-only API (must resolve inside the installed package) ----------
// IMPORTANT: These paths must exist in the published tarball.
// If you are publishing `dist/core/...` etc. (as your npm pack log showed), keep these.
export * from "./motion";
export * from "./navigation";

/*// =========================
// COMPONENTS (Svelte)
// =========================
// LAYOUTS
export { default as ComposeTheme } from "./core/theme/ComposeTheme.svelte";
export { default as AppRoot } from "./components/AppRoot.svelte"
// COMPONENTS
export { default as Surface } from "./components/Surface.svelte";
export { default as Text } from "./components/Text.svelte";
export { default as Column } from "./components/layouts/Column.svelte";
export { default as Row } from "./components/layouts/Row.svelte";
export { default as Box } from "./components/layouts/Box.svelte";
export { default as Spacer } from "./components/Spacer.svelte"
export { default as Button } from "./components/buttons/Button.svelte"
export { default as IconButton } from "./components/buttons/IconButton.svelte"
export { default as ButtonWithIcon } from "./components/buttons/ButtonWithIcon.svelte"
export { default as OutlinedIconButton } from "./components/buttons/OutlinedButton.svelte"
export { default as OutlinedButtonWithIcon } from "./components/buttons/OutlinedButtonWithIcon.svelte"
export { default as CheckButton } from "./components/buttons/CheckButton.svelte"
export { default as TextButton } from "./components/buttons/TextButton.svelte"
export { default as OutlinedButton } from "./components/buttons/OutlinedButton.svelte"
export { default as Card } from "./components/cards/Card.svelte"
export { default as OutlinedCard } from "./components/cards/OutlinedCard.svelte"
export { default as TextField } from "./components/textFields/TextField.svelte"
export { default as OutlinedTextField } from "./components/textFields/OutlinedTextField.svelte"
export { default as TonalButton } from "./components/TonalButton.svelte"
export { default as LazyColumn } from "./components/layouts/LazyColumn.svelte"
export { default as LazyRow } from "./components/layouts/LazyRow.svelte"
export { default as Icon } from "./components/Icon.svelte"
export { default as Image } from "./components/Image.svelte"
export { default as Scaffold } from "./components/layouts/Scaffold.svelte"
// Motions
export { default as AnimatedVisibility } from "./components/motion/AnimatedVisibility.svelte"
export { default as AnimatedContent } from "./components/motion/AnimatedContent.svelte"
// Custom
export { default as CodeBlock } from "./components/custom/CodeBlock.svelte"
// Navigation
export { default as NavHost } from "./core/navigation/NavHost.svelte";

// =========================
// TOKENS / API (TS only)
// =========================
export * from "./core/shapes/RoundedCornerShape"
export * from "./core/theme/ColorScheme";
export * from "./core/theme/TextStyle";
export * from "./core/modifier/Modifier"
export * from "./components/layouts/Arrangement";
export * from "./components/layouts/Alignment";
export * from "./components/ContentScale"
export * from "./core/helpers/painterResource"
export * from "./components/ContentScale"
export * from "./core/theme/Density"
export * from "./core/motion/AnimationSpec"
export * from "./core/motion/transitions"
export * from "./core/motion/contentTransitions"
export * from "./core/navigation/Route";
export * from "./core/navigation/NavController";
export * from "./core/navigation/rememberNavController";
export * from "./core/navigation/composable";*/