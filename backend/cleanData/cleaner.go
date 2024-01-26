package cleanData
import "strings"
func StandardizeString(name string) string {
	return strings.ToLower(name)
}
func CleanName(name string) string {
	middleman := StandardizeString(name)
	return strings.ToUpper(string(name[0])) + middleman[1:]
}
