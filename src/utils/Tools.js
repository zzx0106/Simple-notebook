
import crypto from "crypto";
export const createDate = function(Time) {
  "use static";
  const time = new Date(Time);
  const nowtime = new Date();
  let diff = nowtime.getTime() - time.getTime();
  if (diff / 1000 / 3600 / 24 / 30 / 12 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24 / 30 / 12)}年前`;
  } else if (diff / 1000 / 3600 / 24 / 30 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24 / 30)}个月前`;
  } else if (diff / 1000 / 3600 / 24 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24)}天前`;
  } else if (diff / 1000 / 3600 > 1) {
    return `${Math.floor(diff / 1000 / 3600)}小时前`;
  } else {
    return "刚刚";
  }
};
export const lastUpdate = function(Time) {
  "use static";
  const time = new Date(Time);
  const nowtime = new Date();
  let diff = nowtime.getTime() - time.getTime();
  if (diff / 1000 / 3600 / 24 / 30 / 12 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24 / 30 / 12)}年前`;
  } else if (diff / 1000 / 3600 / 24 / 30 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24 / 30)}个月前`;
  } else if (diff / 1000 / 3600 / 24 > 1) {
    return `${Math.floor(diff / 1000 / 3600 / 24)}天前`;
  } else if (diff / 1000 / 3600 > 1) {
    return `${Math.floor(diff / 1000 / 3600)}小时前`;
  } else {
    return "刚刚";
  }
};
export const encryption = password => {
  const newpassword = Md5(Md5(password).substr(2, 7) + Md5(password));
  return newpassword;
};
const Md5 = password => {
  const md5 = crypto.createHash("md5");
  return md5.update(password).digest("base64");
};

// 报文加密
export const encryptionDatagram = (
  params,
  algorithm = "aes-256-cbc", //算法规则
  key = "9450B9F72916181DBFE7ACE8E14C02A0"
) => {
  var encrypted = "";
  var cip = crypto.createCipher(algorithm, key);
  encrypted += cip.update(JSON.stringify(params), "binary", "hex");
  encrypted += cip.final("hex");
  return encrypted;
};
// 报文解密
export const decryptionDatagram = (
  encrypted,
  algorithm = "aes-256-cbc", //算法规则
  key = "9450B9F72916181DBFE7ACE8E14C02A0"
) => {
  var decrypted = "";
  var decipher = crypto.createDecipher(algorithm, key);
  decrypted += decipher.update(encrypted, "hex", "binary");
  decrypted += decipher.final("binary");
  return JSON.parse(decrypted);
};
