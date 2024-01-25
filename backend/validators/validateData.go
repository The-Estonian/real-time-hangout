package validators

import "net/mail"

func ValidateEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
func ValidatePassword(password1 string) bool {
	return len(password1) >= 6
}
func ValidateName(firstName string) bool {
	name := false
	if len(firstName) >= 3 {
		name = true
	}
	return name
}
