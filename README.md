<img width="128" height="128" src="https://sandbox-static.katon.io/logo.png" alt="Katon.io">

# Katon.io JS SDK

Katon.io Core API Official JS SDK. [Documentation](https://docs.katon.io/official-libraries/javacript-typescript)


The package contains handy methods to:
- create, fetch, list, edit accounts
- perform coin and token transfers between accounts or withdraw assets to an external wallet.

## Getting Started

### Prerequisites
#### Context
All interactions with the Core API are contextualized, it is necessary to first create a project in the ecosystem using  our [Sandbox Dashboard](https://sandbox-app.katon.io).
You can find detailed instructions on how to create a project and generally the dashboard usage in our [official documentation](https://docs.katon.io).

#### API Keys
All interactions must be authenticated. 🔐 Authentication is done through API Keys tied to your project. They can be generated and enabled in the [Sandbox Dashboard](https://sandbox-app.katon.io).

### Installation 

```sh
npm install --save katon.io-js-sdk
```

### First Steps

The interactions are separated in two types. 

#### Public Context

On one hand, the `public context` is responsibke for "READ" actions such as listing accounts, fetching coin or token balances... Although authenticated with the public key, the public context is meant to be used on consummer facing applications (mobile app, site...). Use the following snippet to initialize a public context:


```ts
import { KatonIO, KatonPublicCtx, KatonEnvironments } from 'katon.io-js-sdk'

const ctx: KatonPublicCtx = KatonIO.publicCtx(
  "<project-uuid>",
  "<public-key>",
  { env: KatonEnvironments.sandbox },
);
```

#### Private Context

On the other hand, the `private context` is responsible for "WRITE" actions such as creating/editing accounts or transfering coins/tokens between accounts. Note that the private context also includes all the features of the `public context`

🚨 Warning!! Private contexts require a private authentication level, that is to say, the use of the private key. As a consequence, it must ONLY be used on secured servers (and preferably not hardcoded so it doesn't appear in the codebase). 

Use the following snippet to initialize a private context:

```ts
import { KatonIO, KatonPrivateCtx, KatonEnvironments } from 'katon.io-js-sdk'

const ctx: KatonPrivateCtx = KatonIO.privateCtx(
  "<project-uuid>",
  "<public-key>",
  "<private-key>",
  { env: KatonEnvironments.sandbox },
);
```

## Generic Operations
Not all the APIs are directly wrapped in the SDK (just yet... 😇). But no worries, we provided you with generic methods that encapsulate all the logic to authenticate requests!

```ts
// Perform an authenticated GET requests to Katon.io Core API.
// T is the expected type of the data returned from the API.
async doGet<T>(path: string): Promise<T>;

// Perform an authenticated POST requests to Katon.io Core API.
// T is the expected type of the data returned from the API.
// U is the type of the body expected by the API.
async doPost<T, U>(path: string, body: U): Promise<T>;

// Perform an authenticated PUT requests to Katon.io Core API.
// T is the expected type of the data returned from the API.
// U is the type of the body expected by the API.
async doPut<T, U>(path: string, body: U): Promise<T>;

// Perform an authenticated PATCH requests to Katon.io Core API.
// T is the expected type of the data returned from the API.
// U is the type of the body expected by the API.
async doPatch<T, U>(path: string, body: U): Promise<T>;

// Perform an authenticated DELETE requests to Katon.io Core API.
// T is the expected type of the data returned from the API.
async doDelete<T>(path: string): Promise<T>;
```

Here is a quick example of how to use the generic methods:

```ts
const ctx = ...

ctx.doGet('/v1/accounts?limit=10&offset=0')
```

To figure what endpoints are available, the supported query params as well as the auth type & level required for the call, please have a look at our [Sandbox API Reference](https://sandbox-api.katon.io/v1).

## APIs

### Accounts
The account API allows you out of the box support for account-related interactions.

#### Account Management
```ts
const account = ctx.accounts.withUuid('<account-uuid>')

// Sync account details (firstName, imgUrl, label, tag)...
// the sync method accepts a a boolean param `withBalances` that, 
// if true, would also fetch the 10 first coin and token balances.
await account.sync().catch(console.log)

// Create a new account (or fetch if already exists).
// Note the email is mandatory here. 
// all accounts are referenced with an email that's then linked to an end user in the ecosystem.
const newAccount = await ctx.accounts.createOrFetch('<account-email>').catch(console.log)

// Basic account management

// Remove shared custody permissions to the account owner.
await account.lock().catch(console.log)

// Allow shared custody permissions to the account owner.
await account.unlock().catch(console.log)

// Update the account label.
await account.updateLabel(label: string).catch(console.log)

// Update the account tag.
await account.updateTag(tag: string).catch(console.log)

// Update the  acccount img url.
await account.updateImgUrl(imgUrl: string).catch(console.log)
```

#### Balances
```ts
import { Coins } from 'katon.io-js-sdk'

const account = ctx.accounts.withUuid('<account-uuid>')

// Fetch a specific coin balance.
// Coins enum value e.g.: Coins.kton or network identifier.
await account.balance(coinOrNetworkId: Coins | string).catch(console.log)

// Fetches the coin balances.
// Limit defaults to 10 and offset to 0.
await account.allBalances(limit: number, offset: number).catch(console.log)

// Fetch a specific token balance.
await account.tokenBalance(networkIdentifier: string).catch(console.log)

// Fetches the token balances.
// Limit defaults to 10 and offset to 0.
await account.alltokenBalances(limit: number, offset: number).catch(console.log)
```

#### Transfers
```ts
import { Coins, KatonAccount, TxFundingStrategy } from 'katon.io-js-sdk'

const account = ctx.accounts.withUuid('<account-uuid>')

// Send coins from an account to another.
// Coins enum value e.g.: Coins.kton or network identifier.
// amount: number to be sent.
// receiver account or account uuid.
// TxFundingStrategy: Parameter deciding who pays the tx gas fees. Defaults to owner (i.e: sender for transfers).
// fee: number from 1 - 100. Fee to be collected on the transfer by the project.
await account.send(coinOrNetworkId: Coins | string, amount: number, receiver: KatonAccount | string, txFundingStrategy: TxFundingStrategy, fee?: number).catch(console.log)

// Withdraw coins from an account to an external wallet.
// Coins enum value e.g.: Coins.kton or network identifier.
// amount: number to be sent.
// receiverAddress: wallet address.
// TxFundingStrategy: Parameter deciding who pays the tx gas fees. Defaults to owner (i.e: sender for transfers).
// fee: number from 1 - 100. Fee to be collected on the transfer by the project.
// Note: for ecosystem scoped coins, this API is not available
await account.withdraw(coinOrNetworkId: Coins | string, amount: number, receiverAddress: string, txFundingStrategy: TxFundingStrategy, fee?: number).catch(console.log)

// Send tokens from an account to another.
// networkId: string, Network Identifier.
// amount: number to be sent.
// receiver account or account uuid.
// TxFundingStrategy: Parameter deciding who pays the tx gas fees. Defaults to owner (i.e: sender for transfers).
// fee: number from 1 - 100. Fee to be collected on the transfer by the project.
await account.sendToken(networkId: string, amount: number, receiver: KatonAccount | string, txFundingStrategy: TxFundingStrategy, fee?: number).catch(console.log)

// Withdraw coins from an account to an external wallet.
// networkId: string, Network Identifier.
// amount: number to be sent.
// receiverAddress: wallet address.
// TxFundingStrategy: Parameter deciding who pays the tx gas fees. Defaults to owner (i.e: sender for transfers).
// fee: number from 1 - 100. Fee to be collected on the transfer by the project.
// Note: for ecosystem scoped coins, this API is not available
await account.withdrawToken(networkId: string, amount: number, receiverAddress: string, txFundingStrategy: TxFundingStrategy, fee?: number).catch(console.log)
```

### Projects
Coming Soon 😇.

### Coins
Coming Soon 😇.

### Collections
Coming Soon 😇.

### Tokens
Coming Soon 😇.

## Contributors

- Loïc Combis [@CombisLoic](https://twitter.com/CombisLoic)
- Hugo Maitre [@HmFlashy](https://twitter.com/HmFlashy)

## More about Katon.io
Katon.io is a Saas platform meant to help companies seamlessly integrate blockchain-related technologies with powerful integrated features:
- Secured Custodial Wallet Management.
- Digital Asset Scoping
- Account Locking
- Digital Asset Drafting
- Perpetual Shared Royalties
- Gas Fee Forwarding

### Socials
Follow us on Twitter!! [@io_katon](https://twitter.com/io_katon)

Join ou Telegram!! [Katon.io](https://t.me/katon_io)

Read our articles & tutorials!! [Katon.io](https://blog.katon.io/)

### More Links
- [Site](https://katon.io)
- [Documentation](https://docs.katon.io)
- [Whitepaper](https://sandbox-static.katon.io/whitepaper.pdf)




