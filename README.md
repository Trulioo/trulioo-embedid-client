# trulioo-embedid-client

[![Github](https://github.com/trulioo/trulioo-embedid-client/workflows/Build/badge.svg)](https://github.com/trulioo/trulioo-embedid-client/workflows/Build/badge.svg)

Can be included as a CDN:

```
<script type="text/javascript" src="https://js.trulioo.com/latest/main.js"></script>
```

JavaScript library which streamlines integration with Trulioo.

# How to use

Exposes [TruliooClient](https://github.com/Trulioo/trulioo-embedid-client/blob/master/src/TruliooClient.js) to load EmbedID.

This SDK works in conjunction with the [Trulioo EmbedId Middleware](https://github.com/Trulioo/trulioo-embedid-middleware).

Instantiate EmbedID through the TruliooClient constructor:

```
function handleResponse(e) {
    console.log('@handleResponse', e);
}
const publicKey = 'PUT_YOUR_PUBLIC_KEY_HERE'; // Public Key
new TruliooClient({
    publicKey,
    handleResponse
});
```

Have a look at the [example.html](./example.html) file.
