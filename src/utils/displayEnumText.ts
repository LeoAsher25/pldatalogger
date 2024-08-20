export function displayAlertStatus(value: boolean): {
  label: string;
  color: any;
} {
  switch (value) {
    case true:
      return {
        label: "Bình thường",
        color: "success",
      };

    case false:
      return {
        label: "Lo ngại",
        color: "warning",
      };

    default:
      return {
        label: "---",
        color: "default",
      };
  }
}

export function displayMeasureStatus(value: number): {
  label: string;
  color: any;
} {
  switch (value) {
    case 0:
      return {
        label: "Đang đo",
        color: "primary",
      };

    case 1:
      return {
        label: "Dừng đo",
        color: "warning",
      };

    default:
      return {
        label: "---",
        color: "default",
      };
  }
}
