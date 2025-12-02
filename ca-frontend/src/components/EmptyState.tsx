interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-[#6B7280]">{message}</p>
    </div>
  );
}
