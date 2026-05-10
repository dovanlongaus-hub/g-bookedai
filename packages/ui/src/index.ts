// BookedAI Design System - Shared UI Components
// All components follow: Dark-first, Glass-morphism, WCAG 2.2 AA

export { Button } from './components/Button.js';
export { Card } from './components/Card.js';
export { Badge } from './components/Badge.js';
export { Input } from './components/Input.js';
export { Footer } from './components/Footer.js';
export { Modal } from './components/Modal.js';
export { Select } from './components/Select.js';
export { Tabs } from './components/Tabs.js';
export { ToastProvider, useToast } from './components/Toast.js';
export { DataTable } from './components/DataTable.js';
export { Sidebar } from './components/Sidebar.js';
export { Stepper } from './components/Stepper.js';
export { Skeleton } from './components/Skeleton.js';
export { Accordion } from './components/Accordion.js';
export { Tooltip } from './components/Tooltip.js';
export { Avatar } from './components/Avatar.js';
export { Switch } from './components/Switch.js';
export { cn } from './lib/utils.js';
export { initAuth, getAuthToken, getAuthProvider, isAuthenticated, logout } from './lib/auth.js';

// Re-export types for consumer convenience
export type { ModalProps } from './components/Modal.js';
export type { SelectProps, SelectOption } from './components/Select.js';
export type { TabsProps, TabItem } from './components/Tabs.js';
export type { ToastData } from './components/Toast.js';
export type { DataTableProps, ColumnDef } from './components/DataTable.js';
export type { SidebarProps, SidebarItem, SidebarEntry, SidebarDivider } from './components/Sidebar.js';
export type { StepperProps, StepItem } from './components/Stepper.js';
export type { SkeletonProps } from './components/Skeleton.js';
export type { AccordionProps, AccordionItem } from './components/Accordion.js';
export type { TooltipProps } from './components/Tooltip.js';
export type { AvatarProps } from './components/Avatar.js';
export type { SwitchProps } from './components/Switch.js';

// Design tokens are exported via CSS: import '@bookedai/ui/tokens'
