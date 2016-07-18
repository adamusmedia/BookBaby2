function ValidateEmailNameAddressForm(event) {
    var $form = $("#personal-container");

    if ($("#address-container").find(".txt-zipcode input").val() !== "" ||
        $("#address-container").find(".txt-address1 input").val() !== "" ||
        $("#address-container").find(".txt-address2 input").val() !== "" ||
        $("#address-container").find(".txt-city input").val() !== "")
        $form = $("#request-form");

    return ValidateInputs(event, $form);
}

