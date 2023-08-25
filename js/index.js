window.onload = er => {
	$.ajax({
		url: './js/index.json',
		type: 'get',
		dataType: 'json',
		async : true,
		success(e) {
			res = e;
		}
	})
	
	$(window).ajaxSuccess(function() {
	$.each($(res), function(k, v) {
		let b = $(`
				<li>${v.musicname}
					<span>${v.musictime}</span>
				</li>
				`)
		$('#right>ul').append(b);
	})
	})

	$('#right>ul').on('click', 'li', function() {

		$('.active').removeClass('active');
		$(this).addClass('active');

		let k = $(this).index();
		index = $(this).index();
		let s = res[k];
		$('.img_1').empty();
		$('.img_1').append('<img src="' + s.img + '">');

		$('.left_2>h1').html(s.musicname);
		$('.left_2>p').html(s.name);
		$('.bf').find('audio').attr('src', s.musicurl)
		aud.play(); //继续播放
	})
	// 播放按钮事件
	$('.bf>.but').eq(1).on('click', function() {})

	// 单曲循环事件
	nas = '循环';
	$('.buts').click(function() {
		$('.buts').removeClass('bctive');
		$(this).addClass('bctive');
		nas = $(this).attr('age')
	})

	aud.onended = function() {
		switch (nas) {
			case '循环':
				aud.load(); //重新加载
				aud.play(); //继续播放
				break;
			case '顺序':
				index = index + 1;
				if (index >= res.length) {
					index = 0;
				}
				// 获取数据
				let s = res[index];
				$('.img_1').empty();
				$('.img_1').append('<img src="' + s.img + '">');

				$('.left_2>h1').html(s.musicname);
				$('.left_2>p').html(s.name);
				$('.bf').find('audio').attr('src', s.musicurl);

				$('.active').removeClass('active');
				$('li').eq(index).addClass('active');
				aud.play();

				break;
			case '随机':
				// 随机播放
				index = setRandom(0, $('ul>li').length - 1);
				let c = res[index];

				$('.img_1').empty();
				$('.img_1').append('<img src="' + c.img + '">');

				$('.left_2>h1').html(c.musicname);
				$('.left_2>p').html(c.name);
				$('.bf').find('audio').attr('src', c.musicurl);

				$('.active').removeClass('active');
				$('li').eq(index).addClass('active');
				aud.play();
				break;
		}
	}

	$('.zb').click(function() {
		if (aud.paused) {
			aud.play();
		} else {
			aud.pause();
		}

	})
	// 下一首功能
	$('.next').click(function() {

		index = index + 1;
		if (index > res.length - 1) {
			index = 0;
		}
		let nxt = res[index];

		boFang(nxt, index);
	})

	// 上一首功能

	$('.prev').click(function() {
		index = index - 1;
		if (index < 0) {
			index = res.length - 1;
		}

		let prv = res[index];

		boFang(prv, index);
	})

	// 音量减小
	let yin = 1;
	$('.big>li:first-child').click(function() {
		yin = yin - 0.1;
		if (yin < 0) {
			yin = 0;
		}
		aud.volume = yin;
	})
	// 音量增加

	$('.big>li:last-child').click(function() {
		yin = yin + 0.15;

		if (yin > 1) {
			yin = 1;
		}
		aud.volume = yin;
	})

	// 静音事件

	$('.big>li:nth-child(2)').click(e => {

		if (yin == 1) {
			aud.volume = 0;
			yin = 0;
		} else {
			aud.volume = 1;
			yin = 1;
		}
	})
	// 播放事件
	aud.onplay = function() {

		// 图片旋转
		$('.img_1>img').css({
			// 照片旋转动画
			animation: 'go 8s linear infinite'
		})

		$('.zb').css({
			background: 'url("./img/播放.png") no-repeat',
			backgroundSize: '100%'
		})
	}
	// 暂停事件
	aud.onpause = function() {

		$('.img_1>img').css({
			// 照片动画停止旋转
			'animation-play-state': 'paused'
		})

		$('.zb').css({
			background: 'url("./img/暂停.png") no-repeat',
			backgroundSize: '100%'
		})
	}

	// 可以播放事件
	aud.oncanplay = function() {
		// 获取总时常
		all = parseInt(this.duration);
		// 把all赋值给input
		inp.setAttribute('max', all);
		console.log(all, inp.max)
		// 转分秒
		let f = fullZero(Math.floor(all / 60));
		let m = fullZero(all - f * 60);
	}

	// 正在播放事件
	aud.ontimeupdate = function() {
		// 获取正在播放时常
		let stime = parseInt(this.currentTime);
		inp.value = stime;
		// console.log(inp.value)
		// console.log(stime)
		let fen = fullZero(Math.floor(stime / 60));

		let men = fullZero(stime - fen * 60);
		$('.getime').html(fen + ':' + men);
	}
	aud.onchange = er => {
		console.log('sss')
	}
}

function setRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function fullZero(n) {
	if (n < 10) {
		return '0' + n;
	} else {
		return n;
	}
}

function boFang(c, index) {
	$('.img_1').empty();
	$('.img_1').append('<img src="' + c.img + '">');

	$('.left_2>h1').html(c.musicname);
	$('.left_2>p').html(c.name);
	$('.bf').find('audio').attr('src', c.musicurl);

	$('.active').removeClass('active');
	$('li').eq(index).addClass('active');
	aud.play();
}