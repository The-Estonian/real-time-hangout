package helpers

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func CheckErr(fromWhere string, err error) {
	if err != nil {
		fmt.Println(fromWhere)
		panic(err)
	}
}

func SetHashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
