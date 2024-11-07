const { isMatchPackage } = require("@cybozu/license-manager");

const OSS_LICENSE = [
  "GPL-2.0-only", // https://bozuman.cybozu.com/k/8979/show#record=1
  "GPL-3.0-only", // https://bozuman.cybozu.com/k/8979/show#record=1
  "EUPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=3
  "MPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=4
  "MPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=4
  "MPL-2.0", // https://bozuman.cybozu.com/k/8979/show#record=4
  "LGPL-2.0-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "LGPL-2.1-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "LGPL-3.0-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "CDDL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=6
  "CDDL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=6
  "CPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=7
  "EPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=8
  "EPL-2.0", // https://bozuman.cybozu.com/k/8979/show#record=8
  "YPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=9
  "YPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=9
  "0BSD", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-2-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-3-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-4-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "Apache-2.0", // https://bozuman.cybozu.com/k/8979/show#record=11
  "MIT", // https://bozuman.cybozu.com/k/8979/show#record=12
  "Sendmail", // https://bozuman.cybozu.com/k/8979/show#record=13
  "OpenSSL", // https://bozuman.cybozu.com/k/8979/show#record=14
  "CPOL-1.02", // https://bozuman.cybozu.com/k/8979/show#record=15
  "ISC", // https://bozuman.cybozu.com/k/8979/show#record=16
  "Artistic-1.0", // https://bozuman.cybozu.com/k/8979/show#record=17
  "Artistic-2.0", // https://bozuman.cybozu.com/k/8979/show#record=17
  "WTFPL", // https://bozuman.cybozu.com/k/8979/show#record=18
  "Zlib", // https://bozuman.cybozu.com/k/8979/show#record=20
  "OFL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=26
  "Unlicense", // https://bozuman.cybozu.com/k/8979/show#record=27
  "CC0-1.0", // https://bozuman.cybozu.com/k/8979/show#record=28
  "CC-BY-3.0", // https://bozuman.cybozu.com/k/8979/show#record=29
  "CC-BY-4.0", // https://bozuman.cybozu.com/k/8979/show#record=29
  "ZPL-2.1", // https://bozuman.cybozu.com/k/8979/show#record=31
  "CC-BY-SA-3.0", // https://bozuman.cybozu.com/k/8979/show#record=34
  "CC-BY-SA-4.0", // https://bozuman.s.cybozu.com/k/8979/show#record=34
  "FTL", // https://bozuman.cybozu.com/k/8979/show#record=38
  "BSL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=39
  "X11", // https://bozuman.cybozu.com/k/8979/show#record=40
  "TCL", // https://bozuman.cybozu.com/k/8979/show#record=44
  "BSD-3-Clause-Attribution", // https://bozuman.cybozu.com/k/8979/show#record=45
  "MIT-0", // https://bozuman.cybozu.com/k/8979/show#record=47
  "BlueOak-1.0.0", // https://bozuman.cybozu.com/k/8979/show#record=48
  "OLDAP-2.8", // https://bozuman.cybozu.com/k/8979/show#record=50
  "Unicode-3.0", // https://bozuman.cybozu.com/k/8979/show#record=51
];

const OVERRIDE_LICENSES = {
  "eslint-plugin-kuc-v1@1.0.0": "MIT"
};

const OVERRIDE_LICENSES_TEXT = {
  "eslint-plugin-kuc-v1@1.0.0": "MIT License",
  "@web/test-runner@0.19.0": `MIT License

Copyright (c) 2020 modern-webdev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
};

const config = {
  analyze: {
    query: ":root > .dev", // license-manager uses npm query to search packages.
    allowLicenses: OSS_LICENSE, // If any package is found for which this option is not specified, analyze command will output errors.
    allowPackages: ["@web/test-runner", "eslint-plugin-kuc-v1@1.0.0"], // Packages specified with this option are allowed regardless of the license.
  },
  extract: {
    query: ":root > .dev",
    format: "json",
    output: "licenses-dev.json",
  },
  overrideLicense: (dep) => {
    for (const packageName of Object.keys(OVERRIDE_LICENSES)) {
      if (isMatchPackage(dep, packageName)) {
        return OVERRIDE_LICENSES[packageName];
      }
    }
    return undefined;
  },
  overrideLicenseText: (dep) => {
    for (const packageName of Object.keys(OVERRIDE_LICENSES_TEXT)) {
      if (isMatchPackage(dep, packageName)) {
        return OVERRIDE_LICENSES_TEXT[packageName];
      }
    }
    return undefined;
  },
};

module.exports = config;
