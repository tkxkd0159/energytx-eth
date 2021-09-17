# IPFS

```typescript
await ipfs.post('add', form, {headers: {...form.getHeaders()}, params: {"wrap-with-directory": true}})
// {"Name":"test.json","Hash":"QmaeToP8UEPA9BsvHAtZFaGmKWoQzN1ja3G1wcsVUVPEMz","Size":"401"}
// {"Name":"","Hash":"QmdPFRUtTkAGp86pANxW7bzaY94okhbg1gMK3HhGPwiNmp","Size":"457"}

await readFileFromIPFS('QmaeToP8UEPA9BsvHAtZFaGmKWoQzN1ja3G1wcsVUVPEMz')
await readFileFromIPFS('QmdPFRUtTkAGp86pANxW7bzaY94okhbg1gMK3HhGPwiNmp/test.json')
```