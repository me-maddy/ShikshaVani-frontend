import React, { createContext, useContext, useState } from "react";

type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(
  undefined
);

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Collapsible = ({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  defaultOpen = false,
  children,
  className = "",
}: CollapsibleProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const onOpenChange = setControlledOpen || setUncontrolledOpen;

  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleTrigger = ({
  children,
  className = "",
}: CollapsibleTriggerProps) => {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error("CollapsibleTrigger must be used within Collapsible");
  }

  const { open, onOpenChange } = context;

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      onClick={() => onOpenChange(!open)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenChange(!open);
        }
      }}
    >
      {children}
    </div>
  );
};

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleContent = ({
  children,
  className = "",
}: CollapsibleContentProps) => {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error("CollapsibleContent must be used within Collapsible");
  }

  const { open } = context;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        transition: "height 0.2s ease-out, opacity 0.2s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
