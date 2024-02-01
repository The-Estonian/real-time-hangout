package database

import "fmt"

func AppendDummyData() {
	// Categories
	categoryList := []string{
		"Blue",
		"Green",
		"Orange",
		"Purple",
		"Red",
		"White",
		"Yellow",
	}
	for _, v := range categoryList {
		SetNewCategory(v)
		fmt.Println("Category ", v, "Inserted into Category table")
	}
}
