class ListPixel {
  constructor(idx, data) {
    this.idx = idx;
    this.data = data;
  }

  valueOf() {
    return this.idx;
  }

  toString() {
    return JSON.stringify(this);
  }
}

function imageToList(ctx) {
  let list = new LinkedList();
  let count = 0;

  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let imageData = ctx.getImageData(0, 0, width, height);
  let data = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let node = new ListNode(new ListPixel(count++, data[j * width + i]));
      if (list.tail == null) {
        list.head = node;
        list.tail = node;
      } else {
        list.tail.next = node;
        node.prev = list.tail;
        list.tail = node;
      }
      list.length++;
    }
  }

  return list;
}

function imageToListMerge(ctx, start = 0) {
  let list = new LinkedList();
  let count = start;

  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let imageData = ctx.getImageData(0, 0, width, height);
  let data = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let node = new ListNode(new ListPixel(count++, data[j * width + i]));
      if (list.tail == null) {
        list.head = node;
        list.tail = node;
      } else {
        list.tail.next = node;
        node.prev = list.tail;
        list.tail = node;
      }
      list.length++;
    }

    if (count % 60000 === 0) count += 60000;
  }

  return list;
}

function listToImage(ctx, list) {
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let imageData = ctx.createImageData(width, height);
  let data = new Uint32Array(imageData.data.buffer);

  let temp = list.head;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      data[j * width + i] = temp.data.data;
      temp = temp.next;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function draw(imgSrc, canvas, cb) {
  let img = new Image();
  let ctx = canvas.getContext('2d');
  img.onload = function() {
    ctx.canvas.height = img.height;
    ctx.canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    cb();
  };
  img.src = imgSrc;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let toArray = l => {
  let array = [];
  let temp = l.head;
  while (temp) {
    array.push(temp.data);
    temp = temp.next;
  }

  return array;
};

let toList = a => {
  let ll = new LinkedList();

  let temp = new ListNode(a[0]);
  ll.head = temp;
  ll.tail = temp;
  ll.length = a.length;

  let curr = ll.head;
  for(let i = 1; i < a.length; i++) {
    let ln = new ListNode(a[i]);
    curr.next = ln;
    curr.next.prev = curr;
    curr = curr.next;
  }

  return ll;
};

$(document).ready(function() {
  window.list_mergesort = null;

  $('#button_reverse').click(function() {
    let canvas_reverse = document.getElementById('canvas_reverse');
    draw('img/in_02.png', canvas_reverse, () => {
      let list_reverse = imageToList(canvas_reverse.getContext('2d'));
      list_reverse.reverse();
      listToImage(canvas_reverse.getContext('2d'), list_reverse);
    });
  });

  $('#button_reverse_nth').click(function() {
    let canvas_reverse_nth = document.getElementById('canvas_reverse_nth');
    draw('img/in_03.png', canvas_reverse_nth, () => {
      let list_reverse_nth = imageToList(canvas_reverse_nth.getContext('2d'));
      list_reverse_nth.reverseNth(canvas_reverse_nth.height * 20);
      listToImage(canvas_reverse_nth.getContext('2d'), list_reverse_nth);
    });
  });

  $('#button_waterfall').click(function() {
    let canvas_waterfall = document.getElementById('canvas_waterfall');
    draw('img/in_05.png', canvas_waterfall, () => {
      let list_waterfall = imageToList(canvas_waterfall.getContext('2d'));
      list_waterfall.waterfall();
      listToImage(canvas_waterfall.getContext('2d'), list_waterfall);
    });
  });

  $('#button_split').click(function() {
    let canvas_split = document.getElementById('canvas_split');
    draw('img/in_07.png', canvas_split, () => {
      let list_split = imageToList(canvas_split.getContext('2d'));
      let list1 = list_split.split(400*240);
      let list2 = list1.split(400*240);
      canvas_split.width = 400; canvas_split.height = 240;
      listToImage(canvas_split.getContext('2d'), list_split);
    });
  });

  $('#button_merge').click(function() {
    let canvas_merge_left = document.getElementById('canvas_merge_left');
    let canvas_merge_right = document.getElementById('canvas_merge_right');
    draw('img/in_merge_left.png', canvas_merge_left, () => {
      let list_merge_left = imageToListMerge(canvas_merge_left.getContext('2d'), 0);
      draw('img/in_merge_right.png', canvas_merge_right, () => {
        let list_merge_right = imageToListMerge(canvas_merge_right.getContext('2d'), 60000);

        list_merge_left.mergeWith(list_merge_right);

        canvas_merge_left.width = 600; canvas_merge_left.height = 400;
        listToImage(canvas_merge_left.getContext('2d'), list_merge_left);
        canvas_merge_right.getContext('2d').clearRect(0, 0, canvas_merge_left.width, canvas_merge_left.height);
      });
    });
  });

  $('#button_mergesort').click(function() {
    let canvas_mergesort = document.getElementById('canvas_mergesort');
    list_mergesort.sort();
    canvas_mergesort.width = 480; canvas_mergesort.height = 360;
    listToImage(canvas_mergesort.getContext('2d'), list_mergesort);
  });

  let canvas_mergesort_soln = document.getElementById('canvas_mergesort_soln');
  draw('img/in_01.png', canvas_mergesort_soln, () => {
    list_mergesort = imageToList(canvas_mergesort_soln.getContext('2d'));
    listToImage(canvas_mergesort_soln.getContext('2d'), list_mergesort);

    list_mergesort = toList(shuffle(toArray(list_mergesort)));

    let canvas_mergesort_input = document.getElementById('canvas_mergesort_input');
    canvas_mergesort_input.width = canvas_mergesort_soln.width;
    canvas_mergesort_input.height = canvas_mergesort_soln.height;
    listToImage(canvas_mergesort_input.getContext('2d'), list_mergesort);
  });
});
