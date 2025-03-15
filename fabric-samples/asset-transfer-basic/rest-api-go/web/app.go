package web

import (
	"fmt"
	"net/http"

	"github.com/hyperledger/fabric-gateway/pkg/client"
)

// OrgSetup contains organization's config to interact with the network.
type OrgSetup struct {
	OrgName      string
	MSPID        string
	CryptoPath   string
	CertPath     string
	KeyPath      string
	TLSCertPath  string
	PeerEndpoint string
	GatewayPeer  string
	Gateway      client.Gateway
}
func corsMiddleware(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
                w.Header().Set("Access-Control-Allow-Origin", "*")
                w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
                next.ServeHTTP(w, r)
        })
}
// Serve starts http web server.
func Serve(setups OrgSetup) {
//	http.HandleFunc("/query", setups.Query)
//	http.HandleFunc("/invoke", setups.Invoke)
//	http.HandleFunc("/query", setups.Query)
//	http.HandleFunc("/invoke", setups.Invoke)
        http.Handle("/query", corsMiddleware(http.HandlerFunc(setups.Query)))
        http.Handle("/invoke", corsMiddleware(http.HandlerFunc(setups.Invoke)))
	fmt.Println("Listening (http://localhost:3000/)...")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		fmt.Println(err)
	}
}
