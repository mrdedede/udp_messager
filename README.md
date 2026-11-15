# UDP Messager

A minimal two-terminal chat built with Node.js and UDP datagrams. One script runs as a server, the other as a client. Each line you type is sent as a UDP message to the other side and printed there.

No dependencies: only Node.js built-in modules (`dgram` and `readline`).

## Requirements

- Node.js (any version with `dgram` and `readline`, i.e. any modern release)

## Files

| File            | Role                                                        |
| --------------- | ----------------------------------------------------------- |
| `1_server.js`   | Binds UDP port `8081`, waits for a client, then replies to it |
| `1_client.js`   | Sends messages to the server on port `8081`                 |

## Usage

Open two terminals in the project folder.

**Terminal 1: start the server first**

```bash
node 1_server.js
```

**Terminal 2: start the client**

```bash
node 1_client.js
```

Type a line in either terminal and press Enter. It appears on the other side prefixed with `Client:` (on the server) or `Server:` (on the client).

## How it works

- The server binds to port `8081` and stores the address and port of the last message it received (`clientInfo`).
- The client sends each typed line to `0.0.0.0:8081` and prints every message it receives.
- The server replies to whichever client sent the last message, using the sender's address and port.

## Known limitations

- **The server must hear from the client first.** It only learns where to reply after receiving a message. If you type on the server before any client has sent anything, `clientInfo` is `null` and the script throws a `TypeError`.
- **Local only.** The client sends to `0.0.0.0`, which reaches the local machine. To talk to a server on another machine, change the address in `1_client.js` to that machine's IP.
- **One client at a time.** The server replies to whichever client wrote last. There is no session or user tracking.
- **No delivery guarantees.** UDP does not retry or confirm delivery, so messages can be lost or reordered.
- **Port is fixed** at `8081` in both files.
