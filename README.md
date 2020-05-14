# MyLinks (WIP)

## Use

Preview on [mylinks.one](https://mylinks.one/u/?i=bXlsaW5rczpQcm9maWxlTWFpbjoxCi0tCm5hbWV8TmVydXRoZXMKYXZhdGFyVXJsfGh0dHBzOi8vbmVydXRoZXMueHl6L25lcnV0aGVzLWZvcmNlQ2lyY2xlLXVucGFkZGVkLnBuZwotCjB8bmVydXRoZXMueHl6CjF8aUBuZXJ1dGhlcy54eXoKMnxBRkIzMzczRjUyMDBERjM4CjV8bmVydXRoZXMKNnxuZXJ1dGhlcwo4fG5lcnV0aGVz).

## Data Format

### Numerical Index of Link Types

EntryClassId    | Name          
--------------- | -------------
0               | Website
1               | Email
2               | OpenPGP
3               | // Undefined
4               | // Undefined
5               | GitHub
6               | Twitter
7               | Facebook
8               | Keybase
_               | // Items below are not implemented
9               | Instagram
10              | Dribbble
11              | Behance
12              | Bitcoin
13              | Ethereum
14              | EOS
15              | Arweave
16              |

### EntryItem

#### Structure

```
(Index)|(Arg0)[|(Arg1)]
```

#### Example

```
0|neruthes.xyz
```

### EntryList

```
(Index)|(Arg0)[|(Arg1)]
(Index)|(Arg0)[|(Arg1)]
...
```

#### Example

```
0|neruthes.xyz
0|neruthes.com
1|i@neruthes.xyz
```

### ProfileMeta

#### Metadata Fields

Name            | Description               | Supported
--------------- | ------------------------- | ---------
name            | Name.                     | YES
avatarUrl       | URL of avatar image.      | YES
extraCssUrl     | URL of extra CSS.         | NO

#### Structure

```
(Key)|(ValueArg0)[|(ValueArg1)]
(Key)|(ValueArg0)[|(ValueArg1)]
...
```

#### Example

```
name|Neruthes
avatarUrl|https://neruthes.xyz/neruthes-forceCircle-padded.png
```

### ProfileMain (v1)

### Structure

```
mylinks:ProfileMain:1
--
(ProfileMain)
-
(EntryList)
```

#### Example

```
mylinks:ProfileMain:1
--
name|Neruthes
avatarUrl|https://neruthes.xyz/neruthes-forceCircle-padded.png
-
0|neruthes.xyz
0|neruthes.com
1|i@neruthes.xyz
```

### ProfilePkg

Encode the ProfileMain payload with Base64url encoding, without padding characters.

### MyLinksProfileUrl

#### Structure

https://mylinks.one/u/?i=${ProfilePkg}

## Copyright

Copyright © 2020 Neruthes  [neruthes.xyz](https://neruthes.xyz)

Published under GNU AGPL v3. See `LICENSE.txt` file.
