package main
import (
	"os"
	"fmt"
	"net/http"
)
func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, os.Getenv("HOSTNAME"))
	}) //设置访问的路由
	http.ListenAndServe(":80", nil) //设置监听的端口
}