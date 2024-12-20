"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const DialogComp = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <form
            onSubmit={(event) => {
              wait().then(() => setOpen(false));
              event.preventDefault();
            }}
          >
            {/** some inputs */}
            <button type="submit">Submit</button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

DialogComp.displayName = "DialogComp";
export default DialogComp;
