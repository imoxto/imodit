import { DeleteOutline } from "@mui/icons-material";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { usePopupState } from "material-ui-popup-state/hooks";
import { ConfirmDeleteModal, ConfirmDeleteModalProps } from "./Modals";

interface ConfirmDeleteButtonProps {
  confirmDeleteModalProps: Pick<
    ConfirmDeleteModalProps,
    "question" | "buttonText" | "title" | "onConfirm" | "entity"
  >;
  disabledReason?: string;
  entity: string;
  size?: IconButtonProps["size"];
}

export function ConfirmDeleteButton(props: ConfirmDeleteButtonProps) {
  const {
    size = "small",
    entity,
    confirmDeleteModalProps,
    disabledReason,
  } = props;
  const confirmDeleteModal = usePopupState({
    variant: "popover",
    popupId: "delete-modal",
  });
  const isDisabled = !!disabledReason;
  return (
    <>
      <Tooltip title={disabledReason ?? `Delete ${entity}`}>
        <span>
          <IconButton
            sx={{ p: 0 }}
            size={size}
            onClick={() => {
              confirmDeleteModal.open();
            }}
            disabled={isDisabled}
          >
            <DeleteOutline color={!isDisabled ? "error" : "disabled"} />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmDeleteModal
        {...confirmDeleteModalProps}
        entity={entity}
        open={confirmDeleteModal.isOpen}
        onClose={confirmDeleteModal.close}
      />
    </>
  );
}
