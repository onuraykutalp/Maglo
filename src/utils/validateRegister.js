export function validate(formData) {
    const newErrors = {};
    if (!formData.fullName?.trim())
        newErrors.fullName = "Full Name is required";
    if (!formData.email?.trim())
        newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
    if (!formData.password)
        newErrors.password = "Password is required";
    else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    return newErrors;
}
