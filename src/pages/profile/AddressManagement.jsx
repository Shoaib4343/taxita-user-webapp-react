// AddressManagement.js
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useProfile } from "../../context/ProfileContext";
import { MapPin } from "lucide-react";

// Import components
import AddressSection from "../../components/AddressSection";
import AddressModal from "../../components/AddressModal";
import PageHeader from "../../components/PageHeader";

// Validation utilities
const validatePostCode = (postCode) =>
  /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i.test(postCode);

const AddressManagement = () => {
  const {
    addresses,
    addressesLoading,
    savingAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    getSingleAddress,
  } = useProfile();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [addressForm, setAddressForm] = useState({
    address_line1: "",
    address_line2: "",
    address_line3: "",
    county: "",
    post_code: "",
    town_city: "",
  });

  const [addressErrors, setAddressErrors] = useState({});

  // --- VALIDATIONS ---
  const validateAddress = () => {
    const errors = {};
    if (!addressForm.address_line1 || addressForm.address_line1.length < 5)
      errors.address_line1 = "Address line 1 must be at least 5 characters";

    if (!addressForm.town_city || addressForm.town_city.length < 2)
      errors.town_city = "Town/City must be at least 2 characters";

    if (!addressForm.county || addressForm.county.length < 2)
      errors.county = "County must be at least 2 characters";

    if (!addressForm.post_code) {
      errors.post_code = "Post code is required";
    } else if (!validatePostCode(addressForm.post_code)) {
      errors.post_code = "Please enter a valid UK postcode";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- HANDLERS ---
  const handleAddressSubmit = async () => {
    if (!validateAddress()) {
      toast.error("Please fix the validation errors");
      return;
    }
    try {
      if (editingAddress) {
        await updateAddress(editingAddress, addressForm);
        toast.success("Address updated successfully!");
      } else {
        await createAddress(addressForm);
        toast.success("Address added successfully!");
      }
      resetAddressForm();
    } catch {
      toast.error(
        `Failed to ${editingAddress ? "update" : "add"} address`
      );
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Address deleted successfully!");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const startEditingAddress = async (id) => {
    try {
      const address = await getSingleAddress(id);
      setAddressForm({
        address_line1: address.address_line1 || "",
        address_line2: address.address_line2 || "",
        address_line3: address.address_line3 || "",
        county: address.county || "",
        post_code: address.post_code || "",
        town_city: address.town_city || "",
      });
      setEditingAddress(id);
      setShowAddressForm(true);
      setAddressErrors({});
    } catch {
      toast.error("Failed to load address details");
    }
  };

  const resetAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({
      address_line1: "",
      address_line2: "",
      address_line3: "",
      county: "",
      post_code: "",
      town_city: "",
    });
    setAddressErrors({});
  };

  // --- INPUT HANDLERS ---
  const handleAddressInputChange = (field, value) => {
    setAddressForm({ ...addressForm, [field]: value });
    if (addressErrors[field]) {
      setAddressErrors({ ...addressErrors, [field]: "" });
    }
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-white rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          icon={<MapPin />}
          title="Address Management"
          currentPage="Address Management"
          showTradingYear={false}
          subtitle="Manage your saved addresses and locations."
        />

        <div className="mt-8">
          <AddressSection
            addresses={addresses}
            addressesLoading={addressesLoading}
            onAddAddress={() => {
              setShowAddressForm(true);
              setAddressErrors({});
            }}
            onEditAddress={startEditingAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        </div>
      </div>

      <AddressModal
        isOpen={showAddressForm}
        editingAddress={editingAddress}
        addressForm={addressForm}
        addressErrors={addressErrors}
        savingAddress={savingAddress}
        onClose={resetAddressForm}
        onFieldChange={handleAddressInputChange}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default AddressManagement;