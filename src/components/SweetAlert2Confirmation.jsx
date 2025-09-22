import Swal from 'sweetalert2';

export const showDeleteConfirmation = (title = "Delete Document", text = "Are you sure you want to delete this document? This action cannot be undone.") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: true
  });
};

export const showSuccessAlert = (title = "Success!", text = "Operation completed successfully.") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false
  });
};

export const showErrorAlert = (title = "Error!", text = "Something went wrong.") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonColor: '#d33'
  });
};