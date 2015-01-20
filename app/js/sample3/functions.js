var debugMode = 1;		// 0: false, 1: true

//-----------------------------------------------------//
// ページ初期化
//-----------------------------------------------------//
function initPage() {
	debugMode = 0;

	adjustWindowHeight();
//	doScroll();
	initSideMenu();
	addCurrentPageClass();
	actionSmoothScroll();
}


//-----------------------------------------------------//
// アドレスバーを非表示にする
//-----------------------------------------------------//
function doScroll() {
	var client = document.referrer.indexOf('iPhone');
	var str = location.hash;

	if ((isiPhone) && (hash == '')) {
		window.scrollTo(0, 1);
	}
}

//-----------------------------------------------------//
// ページ高さ調節
//-----------------------------------------------------//
function adjustWindowHeight() {
	debugMode = 0;

	var windowHeight = $(window).height();
	var headerHeight = $('body > .navbar').height();
	var footerHeight = $('body > .footer').height();
	$('body > .container-fluid').css('min-height', (windowHeight - headerHeight - footerHeight) + 'px');
}

//-----------------------------------------------------//
// サイド(スライドインメニュー)追加
//-----------------------------------------------------//
function initSideMenu() {
	debugMode = 0;

	$('.menuToggleBtn').sidr({
		source: '.navbar .container-fluid'
	});
	$('#sidr .sidr-inner .sidr-class-navbar-header').remove();
	$('#sidr .sidr-inner #sidr-id-headerNaviMenu').removeAttr('id').removeAttr('class');

	$('#sidr .sidr-inner').prepend('<p>Main Menu</p>');
	$('#sidr .sidr-inner').prepend('<h3>i-coraboration</h3>');

	$('#sidr .sidr-inner').append('<p>Sub Menu</p>');
	$('#sidr .sidr-inner').append($('#footerNaviMenu').clone().removeAttr('id'));

	$('#sidr .sidr-inner a > i').each(function() {
		var iconClassStr = $(this).attr('class');
		iconClassStr = iconClassStr.replace(/sidr-class-/g, '');
		$(this).attr('class', iconClassStr);
	});
}

//-----------------------------------------------------//
// カレントページクラス付与
//-----------------------------------------------------//
function addCurrentPageClass() {
	debugMode = 0;

	var svrRoot = "/";
	var currentUrl = location.pathname;

	if (currentUrl == svrRoot) {
		currentUrl = "index.html";
	} else {
		currentUrl = currentUrl.replace(svrRoot, "");
	}
	debugPrint(currentUrl);

	var targetMenus = $('.navbar .container .nav, #footerNaviMenu, #sidr');
	targetMenus.find('li').each(function() {
		if ($(this).children('a').length > 0) {
			if ($(this).children('a').attr('href').replace('../', '') == currentUrl) {
				$(this).addClass('active');
			}
		}
	});
}

//-----------------------------------------------------//
// 数値化
//-----------------------------------------------------//
function toNum(targetString) {
	debugMode = 0;

	targetString = targetString.replace('px', '');
	returnValue = (targetString - 0);
	return returnValue;
}

//-----------------------------------------------------//
// サイトギャラリーモーダル
//-----------------------------------------------------//
function openSiteGalleryModal() {
	$('#siteGallery > div').on('click', function() {
		$('#siteGalleryModal').attr('data-num', ($(this).index() + 1));
		$('#siteGalleryModal .modal-body .modalBodyLeft img').attr('src', $(this).find('img').attr('src'));
		$('#siteGalleryModal .modal-body .modalBodyLeft h4').html($(this).find('.site-data .siteName').html());
		$('#siteGalleryModal .modal-body .modalBodyLeft p').html($(this).find('.site-data .siteAge').html() + "年製作");
		$('#siteGalleryModal .modal-body .modalBodyRight').html('<h4>使用技術</h4>' + $(this).find('.site-data .siteTech').html());
		$('#siteGalleryModal').modal();
	});
}
//-----------------------------------------------------//
// サイトギャラリーモーダル横移動
//-----------------------------------------------------//
function moveNextSiteModal(step) {
	debugMode = 0;

	var targetSiteNum = toNum($('#siteGalleryModal').attr('data-num')) + step - 1;
	if (targetSiteNum >= $('#siteGallery > div').length) {
		targetSiteNum = 0;
	}
	$('#siteGallery > div').eq(targetSiteNum).click();
}

//-----------------------------------------------------//
// 画像モーダル
//-----------------------------------------------------//
function initImageModal() {
	var modalTag = (function () {/*
		<!-- #imageModal -->
		<div id="imageModal" class="modal fade" tabindex="-1">
			<div class="modal-dialog">
				<a class="movePrev" onClick="moveNextImageModal(-1);"><i class="fa fa-fw fa-chevron-left"></i></a>
				<a class="moveNext" onClick="moveNextImageModal(1);"><i class="fa fa-fw fa-chevron-right"></i></a>

				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><i class="fa fa-fw fa-times-circle"></i></button>
						<h3 class="modal-title"></h3>
					</div>
					<div class="modal-body">
						<img class="img-thumbnail" style="width:100%;" />
					</div>
				</div>
			</div>
		</div><!--/ #imageModal -->
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

	$('body').append(modalTag);

	$('.img-modal').on('click', function() {
		$('#imageModal .modal-header > .modal-title').html($(this).attr('alt'));
		$('#imageModal .modal-body img').attr('src', $(this).attr('src'));
		$('#imageModal').modal('show');
	});
}

//-----------------------------------------------------//
// 画像モーダル横移動
//-----------------------------------------------------//
function moveNextImageModal(step) {
	debugMode = 0;

	var currentImage = $("body img.img-modal[src='" + $('#imageModal .modal-body img').attr('src') + "']");
	var imageNum = currentImage.parents('.row').find('.img-modal').index(currentImage) + step;
	if (imageNum >= currentImage.parents('.row').find('.img-modal').length) {
		imageNum = 0;
	}
	$('body img.img-modal').eq(imageNum).click();
}

//-----------------------------------------------------//
// 問い合わせ種別自動選択
//-----------------------------------------------------//
function easyContact() {
	if (getParameter('ctn') !== "") {
		$('#contactType').find('option[data-ctn=' + getParameter('ctn') + ']').prop('selected', 'true');
	}

}

//-----------------------------------------------------//
// URLパラメータ取得
//-----------------------------------------------------//
function getParameter(key) {
	debugMode = 0;

	var str = location.search.split("?");
	if (str.length < 2) {
		return "";
	}

	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}

//-----------------------------------------------------//
// フリーダウンロード自動選択
//-----------------------------------------------------//
function easyDownload() {
	debugMode = 0;

	$('#targetDownload').val(getParameter('targetDownload'));
}

//-----------------------------------------------------//
// フリーダウンロードPOST
//-----------------------------------------------------//
function postFreeDownload() {
	if ($('#targetDownload').val() === "") {
		$('#freeDownloadErrorMsg').show();

	} else {
		$('#freeDownloadErrorMsg').hide();
		$('#freeDownloadForm').submit();
	}
}

//-----------------------------------------------------//
// 並列Box高さ調節
//-----------------------------------------------------//
function adjustBoxHeight(objSelecterName) {
	console.log('run');
	var maxHeight = 0;
	$(objSelecterName).find('.sameHeightBox').each(function() {
		if (maxHeight < $(this).height()) {
			maxHeight = $(this).height();
		}
	});
	$(objSelecterName).find('.sameHeightBox').css('height', maxHeight);
}

//-----------------------------------------------------//
// Positioning
//-----------------------------------------------------//
function locateLoadingImage() {
	$('#loadingImage').css({
		top: (($(window).height() - 340) / 2) + 'px',
		left: (($(window).width() - 340) / 2) + 'px'
	});
}

//-----------------------------------------------------//
// フォーム送信
//-----------------------------------------------------//
function formSubmit(targetForm) {
	$('#loadingImage').show();

	var paramStr = "";
	$(targetForm + ' .form-group').each(function() {
		if ($(this).find('.control-label').html() !== "") {
			paramStr += $(this).find('.control-label').html();
			paramStr += "：　" + $(this).find('input, select, textarea').val() + "\n";
		}
	});

	// submit form
	$.post('cgi/main.cgi', {
		'mode': 'contactForm',
		'contactForm': $(targetForm + ' #formName').val(),
		'contactName': $(targetForm + ' #contactName').val(),
		'contactEmail': $(targetForm + ' #contactEmail').val(),
		'contactContext': paramStr
		},
		//return the data
		function(data) {
			$(targetForm + ' a[valCheck=submit]').after('<span class="alert alert-info col-sm-12" style="margin:0;"><strong>Success!</strong>　' + data + '</span>').hide();
			$('#loadingImage').hide();
		}
	);
}

//-----------------------------------------------------//
// プログラムコードサニタイジング
//-----------------------------------------------------//
function codeSanitizing() {
	$('.container-fluid pre').each(function() {
		$(this)
			.addClass('prettyprint')
			.children('code').each(function() {
				var text = $(this).html().replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\t/g, '    ');
				$(this).html(text);
			});
	});
	prettyPrint();
}

//-----------------------------------------------------//
// ブログページサイドメニュー
//-----------------------------------------------------//
function floatSideMenu() {
	var winWidth = $(window).outerWidth();

	if (winWidth >= 1200) {
		if ($('.sideCol').hasClass('span4')) {
			$('.sideCol').removeClass('span4').addClass('span3');
			$('.sideCol').siblings('[class*=span]').removeClass('span8').addClass('span9');
		}

	} else {
		if ($('.sideCol').hasClass('span3')) {
			$('.sideCol').removeClass('span3').addClass('span4');
			$('.sideCol').siblings('[class*=span]').removeClass('span9').addClass('span8');
		}
	}

	if ($('.sideCol').css('float') === 'left') {
		$('.sideCol').css('height', $('.sideCol').siblings('[class*=span]').height());
		var baseHeight = $('.sideCol').parent('div').position().top;

		$(window).scroll(function() {
			var currentScroll = $('html, body').scrollTop()
			if (winWidth >= 980) {
				currentScroll += 40;
			}
			if (currentScroll > baseHeight) {
				$('.sideCol .floatMenu').css('top', (currentScroll - baseHeight));
			} else {
				$('.sideCol .floatMenu').css('top', '0px');
			}
		});
	} else {
		$('.sideCol').css('height', 'auto');
	}
}

//-----------------------------------------------------//
// ダウンロードエントリリスト
//-----------------------------------------------------//
function freeDownloadList(outputType, targetObj) {
	var siteUrl = 'http://www.?.co.jp/';
	if (location.href.indexOf(siteUrl) < 0) {
		siteUrl = "";
	}

	$.ajax({
		url:  siteUrl + 'download/freeDownloads.xml',
		type: 'get',
		dataType: 'xml',
		timeout: 1000,
		error: function(){
			alert('Error loading XML document');
		},
		success: function(xml){
			var entryList = "";
			var reqCnt = outputType.match(/([A-Za-z]*)([\d]+)$/)[2] - 0;
			outputType = outputType.match(/([A-Za-z]*)([\d]+)$/)[1];

			if (outputType === 'summaryList') {
				entryList = $('<dl></dl>');
				var iCnt = 0;
				$(xml).find('entry:lt(' + reqCnt + ')').each(function() {
					entryList.append('<dt>' + $(this).find('publishedDt').text().substr(0, 10) + '</dt><dd><a href="' + siteUrl + $(this).find('entryUrl').text() + '">' + $(this).find('entryTitle').text() + '</a></dd>\n');
				});
				$(targetObj).html(entryList.html());
			}
		}
	});
}


//-----------------------------------------------------//
// Smooth Page Scroll Action
//-----------------------------------------------------//
function actionSmoothScroll() {
	$("a[href^=#]:not('.carousel-control')").on('click', function() {
		var autoScrollFlg = -1;
		var Hash = $(this.hash);
		if (Hash.length) {
			var HashOffset = $(Hash).offset().top;
			$("html, body").stop().animate({
				scrollTop: HashOffset
			}, 1000, function() {
				autoScrollFlg = 0;
			});
		}
		return false;
	});
}

//-----------------------------------------------------//
// デバッグプリント
//-----------------------------------------------------//
function debugPrint(msg) {
	if (debugMode) {
		console.log(msg);
	}
}
