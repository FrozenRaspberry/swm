var provider;
var signer;
var walletStatus;
const WalletStatus = {
	UNINSTALLED: 0,
	INSTALLED: 1,
	CONNECTED: 2
}

const M = 10 ** 18;
var chainId = -1;
var userAccount;
var investConfig;
var assetInfo;
var investItems = [];
var test;

var mintContract
var mintContractAddress = '0xBF0Ac9fB59CcA8495d9c77d4b766b432F6C60B77'
var mintContractABI = '[{"inputs": [{"internalType": "uint256","name": "quantity","type": "uint256"},{"internalType": "bytes32[]","name": "proof","type": "bytes32[]"}],"name": "allowListMint","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"inputs": [{"internalType": "uint256","name": "quantity","type": "uint256"}],"name": "publicSaleMint","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "quantity","type": "uint256"}],"name": "reserveMint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes32","name": "root_","type": "bytes32"}],"name": "setAllowList","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "status","type": "bool"}],"name": "setAllowListStatus","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "operator","type": "address"},{"internalType": "bool","name": "approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "baseURI","type": "string"}],"name": "setBaseURI","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "quantity","type": "uint256"}],"name": "setOwnersExplicit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "status","type": "bool"}],"name": "setPublicSaleStatus","outputs": [],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawMoney","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "addressAppeared","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "addressMintStock","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "amountForPublicSale","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getAllowListStatus","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "getOwnershipData","outputs": [{"components": [{"internalType": "address","name": "addr","type": "address"},{"internalType": "uint64","name": "startTimestamp","type": "uint64"}],"internalType": "struct ERC721A.TokenOwnership","name": "","type": "tuple"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getPublicSaleStatus","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "maxPerAddressDuringMint","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "nextOwnerToExplicitlySet","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "numberMinted","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "publicPrice","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "publicSalePerMint","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "publicSaleStatus","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "tokenByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "uint256","name": "index","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}]'

var publicStatus = -1
var allowListStatus = -1
var numberMinted = -1
var allowListNumber = -1
var totalSupply = -1
var maxMint = 2

var toMint = 2

function isNumber(n) {
	return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function waitFor(variable, callback, param) {
	var interval = setInterval(function() {
		if (window[variable]) {
			clearInterval(interval);
			callback(param);
		}
	}, 200);
}

async function connect() {
	console.log('Connect wallet...')
	try {
		accounts = await ethereum.request({
			method: 'eth_requestAccounts'
		});
	} catch (e) {
		return;
	}
	if (accounts[0]) {
		walletStatus = WalletStatus.CONNECTED;
		userAccount = accounts[0];
		console.log('Connected. ', userAccount);
		updateAccount();
	}
}

async function updateAccount() {
	if (walletStatus == WalletStatus.CONNECTED) {
		walletStatus = WalletStatus.CONNECTED;
		userAccount = accounts[0];
		$('.card-connect-button').hide();
		$('.card-content-connected').show();
		$('#sidebar-connect-button').text(userAccount.slice(0, 6) + '...' + userAccount.slice(-4));
		if (ethereum.chainId == '0x1') {
			networdName = 'ETH Mainnet';
		} else {
			networdName = 'Wrong Network';
			$("button.connect").text("请切换到ETH主网")
			$("button.connect").removeAttr('hidden')
			$("button.connect").width("400px");
			$("button.connect").attr('disabled','disabled')
			return
		}
		console.log(networdName, 'connected.')
		// init mint contract
		mintContract = new ethers.Contract(mintContractAddress, mintContractABI, signer);
		// update mint status
		// updateStatus()
	}
}

async function updateStatus() {
	publicStatus = await mintContract.getPublicSaleStatus()
	console.log('Public Mint Status: ', publicStatus)
	allowListStatus = await mintContract.getAllowListStatus()
	console.log('Allowlist Mint Status: ', allowListStatus)
	totalSupply = await mintContract.totalSupply()
	$(".total-supply").text(totalSupply + '/1500')
	console.log('Total supply: '+ totalSupply)

	amountForPublicSale = await mintContract.amountForPublicSale()
	console.log('Public Sale Amout: '+ amountForPublicSale)
	$(".total-supply").text('公售剩余: ' + amountForPublicSale)
	if (totalSupply >= 1500 || amountForPublicSale <= 0) {
		$("button.connect").removeAttr('hidden')
		$("button.connect").text('卖完了')
		$("button.connect").attr('disabled','disabled')
		return
	}

	if (allowListStatus && !publicStatus) {
		maxMint = 2
		$(".mint-status").text('Free Mint')
		numberMinted = await mintContract.numberMinted(userAccount)
		console.log('You have minted: '+ numberMinted)
		addressAppeared = await mintContract.addressAppeared(userAccount)
		console.log('You have minted: '+ addressAppeared)
		addressMintStock = await mintContract.addressMintStock(userAccount)
		console.log('Your mint stock: '+ addressMintStock)

		if (isWhiteListed()) {
			if (!addressAppeared || addressMintStock > 0) {
				$(".adjust").removeAttr('hidden')
				$(".private-mint").removeAttr('hidden')
			} else {
				$(".mint-message").text('你已经铸造过 ' + numberMinted +' 个了...等公售开启后可以铸造更多!')
				console.log('You have already minted.')
			}
		} else {
			$(".mint-message").text('你不在白名单里，请耐心等待公售~')
			console.log('You are not in the allowlist, please wait for the public mint')
		}
	} else if (publicStatus) {
		maxMint = 5
		$(".adjust").removeAttr('hidden')		
		$(".total-supply").text('公售剩余: ' + amountForPublicSale)

		$(".mint-status").text('Public Mint')
		$(".public-mint").removeAttr('hidden')
		$(".adjust").removeAttr('hidden')
	} else {
		$("button.connect").text("尚未开始...")
		$("button.connect").removeAttr('hidden')
		$("button.connect").attr('disabled','disabled')
	}
}


async function privateMint() {
	$(".mint-message").text('')
	console.log('Private Mint ', userAccount, toMint)
	try {
		tx = await mintContract.allowListMint(toMint, getProof())
	} catch (e) {
		console.log('Public Mint Error')
		if (e.code == 4001) {
			$(".mint-message").text('你取消了交易...')
			return {
				'code': -1,
				'msg': 'user reject'
			};
		} else {
			console.log('send unlock tx error', e)
			return {
				'code': -1,
				'msg': 'send unlock tx error'
			};
		}
	}
	console.log('Private Mint Submit')
	$(".private-mint").text('Minting...')
	result = await provider.waitForTransaction(tx['hash'])
	console.log('Private Mint Confirmed', result)
	$(".private-mint").text('成功！')
	$(".private-mint").attr('disabled','disabled')
	$(".adjust").hide()
	return {
		'code': 1,
		'msg': 'unlock success',
		'result': result
	};
}
$(".private-mint").on('click', privateMint)


async function publicMint() {
	$(".mint-message").text('')
	console.log('Public Mint ', userAccount, toMint)
	try {
		tx = await mintContract.publicSaleMint(toMint, {'value': toMint +'0000000000000000'})
	} catch (e) {
		console.log('Public Mint Error')
		if (e.code == 4001) {
			$(".mint-message").text('你取消了交易...')
			return {
				'code': -1,
				'msg': 'user reject'
			};
		} else {
			console.log('send unlock tx error', e)
			return {
				'code': -1,
				'msg': 'send unlock tx error'
			};
		}
	}
	console.log('Public Mint Submit')
	$(".public-mint").text('Minting...')
	result = await provider.waitForTransaction(tx['hash'])
	console.log('Public Mint Confirmed', result)
	$(".public-mint").text('成功！')
	$(".public-mint").attr('disabled','disabled')
	$(".adjust").hide()
	return {
		'code': 1,
		'msg': 'unlock success',
		'result': result
	};
}
$(".public-mint").on('click', publicMint)

$('div.adjust.minus').on('click', function(e) {
	toMint--
	if (toMint < 1) {
		toMint = 1
	}
	$('div.adjust.number').text(toMint)
	$('button.public-mint').text('Mint ⧫0.0'+toMint)
})

$('div.adjust.add').on('click', function(e) {
	toMint++
	if (toMint > maxMint) {
		toMint = maxMint
	}
	$('div.adjust.number').text(toMint)
	$('button.public-mint').text('Mint ⧫0.0'+toMint)
})


if (typeof window.ethereum == 'undefined') {
	console.log('MetaMask not found!');
	walletStatus = WalletStatus.UNINSTALLED;
	$('#walletModal').modal('show')
} else {
	console.log('MetaMask OK.');
	walletStatus = WalletStatus.INSTALLED;
	try {
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
	} catch (e) {
		console.log('init ethers failed', e)
	}
}

connect();

// fetch("./config/contract-info.json")
// 	.then(response => response.json())
// 	.then(json => {
// 		if (json[ethereum.chainId]) {
// 			assetInfo = json[ethereum.chainId]
// 		} else {
// 			console.log('unsupported network')
// 			$("#sidebar-connect-network").text('Wrong Network');
// 			$("#sidebar-connect-network").css('color', 'red');
// 		}
// 	});

// fetch("./config/invest-config.json")
// 	.then(response => response.json())
// 	.then(json => {
// 		if (json[ethereum.chainId]) {
// 			investConfig = json[ethereum.chainId]
// 			initInvestItem(investConfig)
// 			waitFor('userAccount', initLockRecord, investConfig)
// 		} else {
// 			console.log('unsupported network')
// 			$("#sidebar-connect-network").text('Wrong Network');
// 			$("#sidebar-connect-network").css('color', 'red');
// 		}
// 	});



// async function unlockOnChain(address, i) {
// 	console.log('unlockOnChain', address, i)
// 	abi =
// 		'[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"locker","type":"address"},{"indexed":false,"internalType":"uint256","name":"lockAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"locker","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"components":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"unlockAmount","type":"uint256"},{"internalType":"uint256","name":"lockStartTime","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"indexed":false,"internalType":"struct Vault.LockRecord","name":"unlockedRecord","type":"tuple"}],"name":"Unlock","type":"event"},{"inputs":[{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"getApy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinamount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getTotalLockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserLockRecord","outputs":[{"components":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"unlockAmount","type":"uint256"},{"internalType":"uint256","name":"lockStartTime","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"internalType":"struct Vault.LockRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"lock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"unlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockPeriod","type":"uint256"},{"internalType":"uint256","name":"apy","type":"uint256"}],"name":"updateApy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"l","type":"uint256"}],"name":"updateLock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
// 	var vaultContract = new ethers.Contract(address, abi, signer);
// 	try {
		
// 		tx = await vaultContract.unlock(i)
// 	} catch (e) {
// 		console.log('catch')
// 		if (e.code == 4001) {
// 			$('.toast-header').find('strong').text('Info')
// 			$('.toast-body').text("You've rejected the transaction.")
// 			$('.toast').toast('show')
// 			return {
// 				'code': -1,
// 				'msg': 'user reject'
// 			};
// 		} else {
// 			console.log('send unlock tx error', e)
// 			return {
// 				'code': -1,
// 				'msg': 'send unlock tx error'
// 			};
// 		}
// 	}
// 	console.log('finish')
// 	unlockResult = await provider.waitForTransaction(tx['hash'])
// 	return {
// 		'code': 1,
// 		'msg': 'unlock success',
// 		'result': unlockResult
// 	};
// }

// async function getLockRecordInfoOnChain(vaultAddress, userAddress) {
// 	abi =
// 		'[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"locker","type":"address"},{"indexed":false,"internalType":"uint256","name":"lockAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"locker","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"components":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"unlockAmount","type":"uint256"},{"internalType":"uint256","name":"lockStartTime","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"indexed":false,"internalType":"struct Vault.LockRecord","name":"unlockedRecord","type":"tuple"}],"name":"Unlock","type":"event"},{"inputs":[{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"getApy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinamount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getTotalLockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserLockRecord","outputs":[{"components":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"unlockAmount","type":"uint256"},{"internalType":"uint256","name":"lockStartTime","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"internalType":"struct Vault.LockRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"lockPeriod","type":"uint256"}],"name":"lock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"unlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockPeriod","type":"uint256"},{"internalType":"uint256","name":"apy","type":"uint256"}],"name":"updateApy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"l","type":"uint256"}],"name":"updateLock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
// 	try {
// 		var itemContract = new ethers.Contract(vaultAddress, abi, provider);
// 	} catch (e) {
// 		console.log('init lock record item contarct error', e)
// 	}
// 	lockRecords = await itemContract.getUserLockRecord(userAddress)
// 	return lockRecords
// }


// async function initLockRecord(investConfig) {
// 	vaultAddress = []
// 	tableTemplate = $("template#lock-record-table").html().trim();
// 	tableRowTemplate = $("template#lock-record-table-row").html().trim();
// 	tableClone = $(tableTemplate);
// 	tableRowClone = $(tableRowTemplate);
// 	recordCount = 0
// 	for (investName in investConfig) {
// 		config = investConfig[investName]
// 		if (vaultAddress.includes(config['address'])) {
// 			continue
// 		}
// 		vaultAddress.push(config['address'])
// 		result = await getLockRecordInfoOnChain(config['address'], userAccount)
// 		hasRecord = false
// 		if (result.length == 0) {
// 			continue
// 		}
// 		i = 0
// 		for (record of result) {
// 			recordCount++
// 			name = config['name'] + ' #' + i
// 			recordId = i
// 			lockAmount = parseFloat(record[0] / M)
// 			unlockAmount = parseFloat(record[1] / M)
// 			lockTimestamp = parseInt(record[2])
// 			lockPeriodInSecond = parseInt(record[3])
// 			unlockTimeInSecond = lockTimestamp + lockPeriodInSecond - parseInt(Date.now() / 1000)
// 			if (unlockTimeInSecond < 0) {
// 				unlockMessage = 'Unlock'
// 			} else if (unlockTimeInSecond < 60) {
// 				unlockMessage = '<1 min'
// 			} else if (unlockTimeInSecond < 3600) {
// 				unlockMessage = parseInt(unlockTimeInSecond / 60) + ' min'
// 			} else if (unlockTimeInSecond < 86400) {
// 				unlockMessage = parseInt(unlockTimeInSecond / 3600) + ' hour'
// 			} else {
// 				unlockMessage = parseInt(unlockTimeInSecond / 86400) + ' day ' + parseInt(unlockTimeInSecond / 3600 % 24) + ' hour'
// 			}
// 			tableRowClone.find('.name').text(name)
// 			tableRowClone.find('.lock-amount').text(lockAmount)
// 			tableRowClone.find('.unlock-amount').text(unlockAmount)
// 			if (unlockMessage == 'Unlock'){
// 				tableRowClone.find('button').attr('hidden', false)
// 				tableRowClone.find('button').attr('record-id', i)
// 				tableRowClone.find('button').attr('unlock-address', config['address'])
// 			} else {
// 				tableRowClone.find('.unlock-time').text(unlockMessage)
// 			}
// 			tableClone.find('table').append(tableRowClone.clone())
// 			i++
// 		}
// 	}
// 	if (recordCount == 0){
// 		return
// 	}
// 	$("lock-record-list").append(tableClone)
// 	$("button.lock-record").on('click', function(e) {
// 		console.log('clicked unlock')
// 		$(this).text('Unlocking...')
// 		$(this).css('border-width', '0px')
// 		$(this).attr('disabled', true)
// 		address = $(this).attr('unlock-address')
// 		recordId = $(this).attr('record-id')
// 		this.btn = $(this)
// 		unlockOnChain(address, recordId).then(r => {
// 			btn = this.btn
// 			if (r.code == 1) {
// 				console.log('unlock success', r)
// 				btn.text('Done.')
// 				btn.css('border-width', '0px')
// 				setTimeout(function() {
// 					window.location.reload();
// 				}, 5000);
// 			} else {
// 				console.log('unlock failed', r)
// 				btn.text('Unlock')
// 				btn.css('border-width', '1px')
// 				btn.attr('disabled', false)
// 			}
// 		})
// 	})
// }
