<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description"
        content="Convert a list of data to array easily with ArrayCat. For example, a CSV file to JavaScript array without duplicate elements.">
  <meta name="author" content="Macecraft Software">
  <meta property="og:title" content="ArrayCat">
  <meta property="og:description"
        content="Convert a list of data to array easily with ArrayCat. For example, a CSV file to JavaScript array without duplicate elements.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://arraycat.com/">
  <meta property="og:image" content="https://arraycat.com/assets/images/arraycat.png">
  <title>Convert list to array with ArrayCat</title>
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="./assets/favicon/favicon-16x16.png"
  >
  <link rel="stylesheet" href="./assets/css/bootstrap.css">
  <link rel="stylesheet" href="./assets/css/loading.css">
  <link rel="stylesheet" href="./assets/css/style.css">
  <script defer data-domain="arraycat.com" src="https://plausible.io/js/script.js"></script>
</head>
<body class="home-page">
<header>
  <nav class="navbar navbar-expand-lg mx-auto py-0">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="navbar-brand mr-2">
          <img
            width="90"
            class="img-fluid"
            src="assets/images/logo.svg"
            alt="ArrayCat logo"
            title="ArrayCat is sweepy after converting so many lists to arrays">
        </div>
        <div class="">
          <h1 class="mb-0">ArrayCat</h1>
          <h2 class="mb-0">Converts any list to array</h2>
        </div>
      </div>
      <div class="tumbler-wrapper">
        <div class="tumbler"></div>
        <img
          class="sun-light"
          src="./assets/images/switch_normalmode.svg"
          alt=""
        >
        <img
          class="moon-light"
          src="./assets/images/switch_darkmode.svg"
          alt=""
        >
      </div>
    </div>
  </nav>
</header>
<main class="mx-auto mt-0 px-3 max-w-640">
  <div>
    <p class="mt-sm-5 pb-4">
      ArrayCat is a free tool for converting a list of data into an array. For example, you can convert CSV file into
      PHP array. Or, into a JavaScript array. Or even into an SQL insertion thingie, which is technically not an array,
      but cats get confused sometimes.<br><br>
      The conversion can also transform the data into something better, such as sorting, removing of duplicate elements
      and converting data to lower case.
    </p>
  </div>

  <div class="input-box p-4">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center mb-3 mb-md-0">
        <p class="my-0 mr-2 font-weight-bold">Input data format:</p>
        <div class="selectBox dropdown">
          <div
            class="selectBox__value dropdown-toggle"
            data-toggle="dropdown"
            id="inputDataFormat"
          >
            One item per row
          </div>
          <div class="dropdown-menu">
            <a href="javascript:void(0)" class="dropdown-item ">Comma separated</a>
            <a href="javascript:void(0)" class="dropdown-item">Inside quotation marks</a>
            <a href="javascript:void(0)" class="dropdown-item active">One item per row</a>
            <a href="javascript:void(0)" class="dropdown-item">Tab separated</a>

          </div>
        </div>
      </div>
      <div class="d-flex">
        <button class="default-btn mr-2" id="exampleBtn">Example</button>
        <div class="default-btn" id="uploadBtn">
          <input type="file" id="uploadfile">
          Load file
        </div>
      </div>
    </div>
    <textarea
      class="text-area w-100 mt-3"
      name="inputData"
      id="inputData"
      rows="10"
      spellcheck="false"
    ></textarea>
  </div>
  <div class="text-center my-5">
    <button class="default-btn" id="convertBtn">Convert</button>
  </div>
  <div class="output-box p-4 mb-5">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center mb-3 mb-md-0">
        <p class="my-0 mr-2 font-weight-bold">Output data format:</p>
        <div class="selectBox dropdown">
          <div
            class="selectBox__value dropdown-toggle"
            data-toggle="dropdown"
            id="outputDataFormat">
            JavaScript array
          </div>
          <div class="dropdown-menu">
            <a href="javascript:void(0)" class="dropdown-item">Delphi array</a>
            <a href="javascript:void(0)" class="dropdown-item active">JavaScript array</a>
            <a href="javascript:void(0)" class="dropdown-item">One item per row</a>
            <a href="javascript:void(0)" class="dropdown-item">Pascal array</a>
            <a href="javascript:void(0)" class="dropdown-item">PHP array</a>
            <a href="javascript:void(0)" class="dropdown-item">Python array</a>
            <a href="javascript:void(0)" class="dropdown-item">SQL insert</a>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="dropdown mr-2" id="transformDropdown">
          <button
            type="button"
            class="default-btn dropdown-toggle"
            data-toggle="dropdown">
            Transform &nbsp;
          </button>
          <div class="dropdown-menu px-3">
            <div class="py-2">
              <input type="checkbox" id="base64" name="base64">
              <label class="mb-0" for="base64">Base64 encode elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="countDuplicate" name="countDuplicate">
              <label class="mb-0" for="countDuplicate">Count duplicate elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="htmlEntities" name="htmlEntities">
              <label class="mb-0" for="htmlEntities">Convert to HTML entities</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="lowercase" name="lowercase">
              <label class="mb-0" for="lowercase">Convert to lower case</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="fixApostrophes" name="fixApostrophes">
              <label class="mb-0" for="fixApostrophes">Fix apostrophes</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="normalize" name="normalize">
              <label class="mb-0" for="normalize">Remove diacritics</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="duplicates" name="duplicates">
              <label class="mb-0" for="duplicates">Remove duplicate elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="removeEmptyElement" name="removeEmptyElement" checked>
              <label class="mb-0" for="removeEmptyElement">Remove empty elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="sort" name="sort">
              <label class="mb-0" for="sort">Sort elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="stripWhitespace" name="stripWhitespace">
              <label class="mb-0" for="stripWhitespace">Strip excess whitespace</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="unifyWhitespace" name="unifyWhitespace">
              <label class="mb-0" for="unifyWhitespace">Unify whitespace</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="whitespace" name="whitespace" checked>
              <label class="mb-0" for="whitespace">Trim whitespace</label>
            </div>

            <div id="maxrowwidthbox">
              <label for="maxRowWidth">Maximum row length:</label>
              <input
                type="number"
                id="maxRowWidth"
                value="512"
                min="1"
                name="maxRowWidth"
              >
            </div>
          </div>
        </div>
        <button class="default-btn" id="copyBtn">
          Copy<span class="d-none d-sm-inline"> to clipboard</span>
        </button>
      </div>
    </div>
    <div class="mt-3 w-100 bg-white br-12 overflowx-auto output-box-inner">
          <textarea
            class="text-area"
            name="outputData"
            id="outputData"
            spellcheck="false"
            readonly
          ></textarea>
    </div>
  </div>
  <div class="loading-element-mask">
    <div class="loading-element">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</main>
<footer class="px-3">
  <div>
    <p>The following transformations are supported:</p>
    <ul>
      <li>Base64 encode each element.</li>
      <li>Count duplicate elements.</li>
      <li>Convert to HTML elements. This option will convert all applicable characters to HTML entities. For example,
        "Durian > Jackfruit" becomes "Durian &amp;gt; Jackfruit".
      </li>
      <li>Convert each element to lower case.</li>
      <li>Remove diacritics. This option will attempt to remove any diacritics and accent characters. For example,
        converting "Crème Brulée" into "Creme Brulee", which is equally yummy but possibly easier to process.
      </li>
      <li>Remove duplicate elements. Removes any elements with identical content, after other transformers have been run
        first. For example, if your list contains "John" and "john" and you have the <i>Convert each element to lower
          case</i> enabled, only "john" will be added to the final output.
      </li>
      <li>Remove empty elements.</li>
      <li>Sort elements. If enabled, the final output will be in alphabetical order.</li>
      <li>Strip excess whitespace. Removes any cases of multiple spaces between words.</li>
      <li>Unify whitespace. Replaces all whitespace characters with a single space.</li>
      <li>Trim whitespace. Removes any leading and trailing space characters of each element.</li>
    </ul>

    <p>
      <b>Privacy Policy:</b> Cats mind their own business. Data processing happens only inside
      your browser, no data is sent to anywhere.<br><br>
      <b>Terms of Service:</b> This service is provided to you “as is” without any guarantees of any kind. If you wish
      to use this service, you will do so entirely at your own risk. For any feedback, please send an email: <a
      href="mailto:jouni@arraycat.com">jouni@arraycat.com</a>.<br><br>
      &copy; Copyright 2023-<?php echo date('Y'); ?> <a href="https://greatsoftwarecompany.com" target="_blank">Great Software Company</a>. All Rights Reserved.
    </p>

  </div>
</footer>
<div class="copy-notification"></div>
<script src="./assets/js/cookie.js"></script>
<script src="./assets/js/darkmode.js"></script>
<script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/alert.js"></script>
<script src="./assets/js/script.js"></script>
</body>
</html>
