const exampleArray = ["Apple", "Banana", "Grapefruit", "Orange", "Durian", "Pear", "Yellow plum", "Açaí"];
const sqlTblName = "test_tbl";
const sqlColName = "test_column";

$(document).ready(function () {


  $(".selectBox").on("click", function (e) {
    $(this).addClass("show");
    var dropdownItem = e.target;
    var container = $(this).find(".selectBox__value");
    container.text(dropdownItem.text);
    $(dropdownItem).addClass("active").siblings().removeClass("active");
  });
  $("#transformDropdown .dropdown-menu>div").click(function (e) {
    e.stopPropagation();
  });
  $("#transformDropdown .dropdown-toggle").click(function () {
    let outputDataFormat = $("#outputDataFormat").text();
    if (outputDataFormat.trim().toLowerCase() === "sql insert") $("#maxrowwidthbox").hide();
    else $("#maxrowwidthbox").show();
  });
  let inputDataEle = $("#inputData");
  $("#exampleBtn").click(function () {
    let inputDataFormat = $("#inputDataFormat").text();

    switch (inputDataFormat.trim()) {
      case "Comma separated":
        inputDataEle.val(exampleArray.toString());
        break;
      case "Tab separated":
        inputDataEle.val(exampleArray.join("\t"));
        break;
      case "One item per row":
        inputDataEle.val(exampleArray.join("\n"));
        break;
      case "Inside quotation marks":
        let temp = "Some tasty fruits include: ";
        sep = ", ";
        for (let i = 0; i < exampleArray.length; i++) {
          if (i === exampleArray.length - 2) sep = " and ";
          if (i === exampleArray.length - 1) sep = "";
          temp += '"' + exampleArray[i] + '"' + sep;
        }
        temp += "."
        inputDataEle.val(temp);
        break;
      default:
        inputDataEle.val(exampleArray.toString());
    }
  });

  $("#uploadfile").change(function (e) {
    $(".loading-element-mask").addClass("active");
    let inputData = $("#inputData");
    let file = $(this)[0].files[0];
    let reader = new FileReader();

    let textFile = /text.*/;

    if (file.type.match(textFile)) {
      fileLoad(reader);
    } else {
      inputData.html(
        "<span class='error'>It doesn't seem to be a text file!</span>"
      );
    }
    reader.readAsText(file);
  });
  $(".output-box-inner").hide();
  $("#copyBtn").hide();

  let transformClicked = false;
  let transformTimeout;


  $("#convertBtn").click(function () {
    transformClicked = true;
    $(".output-box-inner").show();
    $("#copyBtn").show();
    let dataStr = $("#inputData").val();
    if (dataStr.trim().length == 0) {
      $("#exampleBtn").click();
      dataStr = $("#inputData").val();
    }

    if (dataStr) {
      if ($("#normalize").is(":checked")) {
        dataStr = dataStr.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      }
      if ($("#lowercase").is(":checked")) {
        dataStr = dataStr.toLowerCase();
      }
      if ($("#htmlEntities").is(":checked")) {
        dataStr = $("<textarea/>").html(dataStr).html();
        dataStr = $("<div/>").text(dataStr).html();
      }
      $(".loading-element-mask").addClass("active");
      let inputDataFormat = $("#inputDataFormat").text();
      let dataArr = [];

      switch (inputDataFormat.trim()) {
        case "Comma separated":
          dataArr = dataStr.split(",");
          outputDataFunc(dataArr);
          break;
        case "Tab separated":
          dataArr = dataStr.split("\t");
          outputDataFunc(dataArr);
          break;
        case "One item per row":
          dataArr = dataStr.split("\n");
          outputDataFunc(dataArr);
          break;
        case "Inside quotation marks":
          const re = /(['"])(.*?)\1/g;
          let current;
          while (current = re.exec(dataStr)) {
            dataArr.push(current.pop());
          }
          outputDataFunc(dataArr);
          break;
        default:
          inputDataEle.val(data.split(",").toString());
      }
    }
  });
  function delayedTransform() {
    if (transformClicked) {
      clearTimeout(transformTimeout);
      transformTimeout = setTimeout(() => {
        $("#convertBtn").click();
      }, 1000);
    }
  }
  $("#outputDataFormat + .dropdown-menu .dropdown-item").on("click", function() {
    $("#outputDataFormat  + .dropdown-menu .dropdown-item").removeClass("active");
    $(this).addClass("active");

    $("#outputDataFormat").text($(this).text());

    delayedTransform();
  });

  $("#inputDataFormat + .dropdown-menu .dropdown-item").on("click", function() {
    $("#inputDataFormat + .dropdown-menu .dropdown-item").removeClass("active");
    $(this).addClass("active");

    $("#inputDataFormat").text($(this).text());

    delayedTransform();
  });
  $("#inputDataFormat + .dropdown-menu .dropdown-item").on("click", function() {
    $("#inputDataFormat + .dropdown-menu .dropdown-item").removeClass("active");
    $(this).addClass("active");

    $("#inputDataFormat").text($(this).text());

    delayedTransform();
  });
  $("#transformDropdown input[type=checkbox]").on("change", delayedTransform);

  $("#copyBtn").click(function (event) {
    event.preventDefault();
    let outputData = $("#outputData").text();
    CopyToClipboard(outputData, "Copied to clipboard!");
  });
});

async function fileLoad(reader) {
  let myPromise = new Promise(function (resolve) {
    reader.onload = function (event) {
      resolve(event.target.result);
    };
  });
  let data = await myPromise;
  let inputDataEle = $("#inputData");
  let inputDataFormat = $("#inputDataFormat").text();

  setTimeout(() => {
    switch (inputDataFormat.trim()) {
      case "Comma separated":
        inputDataEle.val(data.split(",").toString());
        break;
      case "Tab separated":
        inputDataEle.val(data.split("\t").join("\t"));
        break;
      case "One item per row":
        inputDataEle.val(data.split("\n").join("\n"));
        break;
      case "Inside quotation marks":
        let temp = [];
        const re = /"([^"]+)"/g;
        let match;
        while ((match = re.exec(data)) !== null) {
          temp.push('"' + match[1] + '"');
        }
        inputDataEle.val(temp);
        break;
      default:
        inputDataEle.val(data.split(",").toString());
    }
    $(".loading-element-mask").removeClass("active");
  }, 1000);
}

function CopyToClipboard(value, notificationText) {
  var $temp = $("<input>");
  $("body").append($temp);
  $("#outputData").select();
  document.execCommand("copy");
  $temp.remove();

  $(".copy-notification").html(
    `<div class="alert alert-success d-flex mb-0">
        <div><img width="40px" height="40px" src="./assets/images/icon_message.svg" /></div>
        <p class="my-auto ml-1">${notificationText}</p>
      </div>`
  );
  alertFunc();
}

function formatArrayElement(element, quote, outputFormat) {
  return quote + element + quote;
}

function formatArrayWithWrapping(elements, options) {
  const {
    quote = '"',
    separator = ", ",
    outputDataWidth,
    prefix = "",
    suffix = ""
  } = options;

  let outputDataStr = "";
  let len_sum = 0;

  for (let i = 0; i < elements.length; i++) {
    const sep = i === elements.length - 1 ? "" : separator;
    const formattedElement = formatArrayElement(elements[i], quote, options.outputFormat);

    outputDataStr += formattedElement + sep;
    len_sum += elements[i].length + (quote.length * 2) + sep.length;

    if (len_sum >= outputDataWidth) {
      outputDataStr += "\n";
      len_sum = 0;
    }
  }

  return prefix + outputDataStr + suffix;
}
function unifyWhitespace(str) {
  // 1. First unescape all Unicode sequences and special characters
  str = str.replace(/\\u([\dA-F]{4})/gi,
    (match, grp) => String.fromCharCode(parseInt(grp, 16)))
    .replace(/\\[tnrfv]/g, (match) =>
      ({ '\\t': '\t', '\\n': '\n', '\\r': '\r',
        '\\f': '\f', '\\v': '\v' }[match]));

  // 2. Then handle ALL whitespace and control characters in three ways:
  return str
    // A. Regex for known whitespace chars (including Unicode)
    .replace(/[\s\u0085\u00A0\u1680\u180E\u2000-\u200F\u2028-\u202F\u205F\u3000]/g, ' ')

    // B. Explicit charCode replacement for control chars ≤ 32
    .split('')
    .map(c => c.charCodeAt(0) <= 32 ? ' ' : c)
    .join('')

    // C. Final cleanup of multiple spaces
    .replace(/\s{2,}/g, ' ')
    .trim();
}
function outputDataFunc(data) {
  let outputDataFormat = $("#outputDataFormat").text();
  let outputDataEle = $("#outputData");
  let outputDataWidth = $("#maxRowWidth").val();
  let finalOutputDataStr = "";
  let dataArr = [];
  if (outputDataWidth < 1) outputDataWidth = 1; // just in case

  data.map((e) => {
    e = e.replace(/[\n\r]/g, "");
    if (outputDataFormat.toLowerCase() !== "pascal array" && outputDataFormat.toLowerCase() !== "delphi array") e = e.replace(/(["])/g, "\\$1");
    else e = e.replace(/(['])/g, "''");
    if ($("#whitespace").is(":checked")) e = e.trim();
    if ($("#base64").is(":checked")) e = btoa(e);
    if ($("#unifyWhitespace").is(":checked")) {
      e = unifyWhitespace(e);  // Applies all transformations
    }
    if ($("#fixApostrophes").is(":checked")) {
      // Only replace apostrophes inside actual content, not inside formatting
      e = e.replace(/'/g, "’");
    }
    if ($("#stripWhitespace").is(":checked")) {
      e = e.replace(/\s{2,}/g, ' '); // Replace 2+ spaces with single space
    }
    dataArr.push(e);
  });

  var sortV = $("#sort").is(":checked");
  var duplicateV = $("#countDuplicate").is(":checked");
  if ($("#duplicates").is(":checked")) dataArr = getUnique(dataArr);
  if (duplicateV) dataArr = countDuplicateElements(dataArr, sortV);
  if ($("#sort").is(":checked") && !duplicateV) {
    dataArr.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
  }
  if ($("#removeEmptyElement").is(":checked"))
    dataArr = dataArr.filter(function (el) {
      return el != "";
    });

  let outputFormat = outputDataFormat.trim().slice(0, 3).toLowerCase();
  switch (outputFormat) {
    case "jav": // JavaScript
      finalOutputDataStr = formatArrayWithWrapping(dataArr, {
        quote: '"',
        outputDataWidth,
        prefix: "[",
        suffix: "];"
      });
      break;

    case "pas": // Pascal
      finalOutputDataStr = formatArrayWithWrapping(dataArr, {
        quote: "'",
        outputDataWidth,
        prefix: "Const arr : Array[0.." + (dataArr.length - 1) + "] of String =\n(",
        suffix: ");"
      });
      break;

    case "del": // Delphi
      finalOutputDataStr = formatArrayWithWrapping(dataArr, {
        quote: "'",
        outputDataWidth,
        prefix: "Const arr : Array of String =\n[",
        suffix: "];"
      });
      break;

    case "php":
      finalOutputDataStr = formatArrayWithWrapping(dataArr, {
        quote: '"',
        outputDataWidth,
        prefix: "array(",
        suffix: ");"
      });
      break;

    case "pyt": // Python
      finalOutputDataStr = formatArrayWithWrapping(dataArr, {
        quote: '"',
        outputDataWidth,
        prefix: "[",
        suffix: "]"
      });
      break;

    case "one": // One item per row
      finalOutputDataStr = dataArr.join("\n") + "\n";
      break;

    case "sql":
      finalOutputDataStr = dataArr.map(item =>
        `INSERT IGNORE INTO ${sqlTblName}(${sqlColName}) VALUES("${item}");`
      ).join("\n") + "\n";
      break;
  }

  setTimeout(() => {
    outputDataEle.text(finalOutputDataStr);
    $(".loading-element-mask").removeClass("active");
  }, 1000);
}

function getUnique(array) {
  var uniqueArray = [];

  // Loop through array values
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}


function countDuplicateElements(inputArray, sortElements = false) {
  const counts = {};

  // Count the occurrences of each element in the input array
  inputArray.forEach((item) => {
    const trimmedItem = item.trim(); // Trim the element
    counts[trimmedItem] = (counts[trimmedItem] || 0) + 1;
  });

  // Create an array of objects with count and element properties
  const resultArray = Object.entries(counts).map(([element, count]) => ({count, element}));

  // Sort the result array based on counts and element names
  resultArray.sort((a, b) => {
    if (sortElements) {
      // Sort alphabetically by element names
      const elementA = a.element;
      const elementB = b.element;
      return elementA.localeCompare(elementB);
    } else {
      // Sort by counts in descending order
      const countA = parseInt(a.count);
      const countB = parseInt(b.count);
      return countB - countA;
    }
  });

  // Create an array of strings in the format "count:element"
  const formattedResult = resultArray.map(({count, element}) => `${count}:${element}`);
  return formattedResult;
}
