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

    $("#convertBtn").click(function () {
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

function outputDataFunc(data) {
    let outputDataFormat = $("#outputDataFormat").text();
    let outputDataEle = $("#outputData");
    let outputDataWidth = $("#maxRowWidth").val();
    let outputDataStr = "";
    let finalOutputDataStr = "";
    let sep = ", ";
    let dataArr = [];
    if (outputDataWidth < 1) outputDataWidth = 1; // just in case

    data.map((e) => {
        e = e.replace(/[\n\r]/g, "");
        if (outputDataFormat.toLowerCase() !== "pascal/delphi array") e = e.replace(/(["])/g, "\\$1");
        else e = e.replace(/(['])/g, "''");
        if ($("#whitespace").is(":checked")) e = e.trim();
        if ($("#base64").is(":checked")) e = btoa(e);
        dataArr.push(e);
    });
    var sortV = $("#sort").is(":checked");
    var duplicateV = $("#countDuplicate").is(":checked");
    if ($("#duplicates").is(":checked")) dataArr = getUnique(dataArr);
    if (duplicateV) dataArr = countDuplicateElements(dataArr, sortV);
    if ($("#sort").is(":checked") && !duplicateV) {
        dataArr.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }
    if ($("#removeEmptyElement").is(":checked"))
        dataArr = dataArr.filter(function (el) {
            return el != "";
        });

    let len_sum = 0;
    switch (outputDataFormat.trim().slice(0, 3).toLowerCase()) {
        case "jav": // JavaScript
            for (let i = 0; i < dataArr.length; i++) {
                if (i === dataArr.length - 1) sep = "";
                outputDataStr += '"' + dataArr[i] + '"' + sep;
                len_sum += dataArr[i].length + 4;
                if (len_sum >= outputDataWidth) {
                    outputDataStr += "\n";
                    len_sum = 0;
                }
            }
            finalOutputDataStr = "[" + outputDataStr + "];";
            break;
        case "pas": //Pascal/Delphi
            for (let i = 0; i < dataArr.length; i++) {
                if (i === dataArr.length - 1) sep = "";
                outputDataStr += "'" + dataArr[i] + "'" + sep;
                len_sum += dataArr[i].length + 4;
                if (len_sum >= outputDataWidth) {
                    outputDataStr += "\n";
                    len_sum = 0;
                }
            }
            finalOutputDataStr = "(" + outputDataStr + ");";
            break;
        case "php":
            for (let i = 0; i < dataArr.length; i++) {
                if (i === dataArr.length - 1) sep = "";
                outputDataStr += '"' + dataArr[i] + '"' + sep;
                len_sum += dataArr[i].length + 4;
                if (len_sum >= outputDataWidth) {
                    outputDataStr += "\n";
                    len_sum = 0;
                }
            }
            finalOutputDataStr = "array(" + outputDataStr + ");";
            break;
        case "pyt": // Python
            for (let i = 0; i < dataArr.length; i++) {
                if (i === dataArr.length - 1) sep = "";
                outputDataStr += '"' + dataArr[i] + '"' + sep;
                len_sum += dataArr[i].length + 4;
                if (len_sum >= outputDataWidth) {
                    outputDataStr += "\n";
                    len_sum = 0;
                }
            }
            finalOutputDataStr = "[" + outputDataStr + "]";
            break;
        case "one": // New output format (one item per row)
            for (let i = 0; i < dataArr.length; i++) {
                outputDataStr += dataArr[i];
                outputDataStr += "\n";
            }
            finalOutputDataStr = outputDataStr;
            break;
        case "sql":
            for (let i = 0; i < dataArr.length; i++) {
                outputDataStr +=
                    "INSERT IGNORE INTO " +
                    sqlTblName +
                    "(" +
                    sqlColName +
                    ') VALUES("' +
                    dataArr[i] +
                    '");' +
                    "\n";
            }

            finalOutputDataStr = outputDataStr;
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
