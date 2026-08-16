/*
PERSONAL FINANCE TRACKER — GOOGLE SHEETS BACKEND
1. Create a blank Google Sheet.
2. Extensions → Apps Script.
3. Paste this entire file into Code.gs.
4. Deploy → New deployment → Web app.
5. Execute as: Me.
6. Who has access: Anyone (or your organization's allowed users).
7. Copy the /exec URL into the PWA's Google Sheets Sync panel.

The script creates these tabs:
Accounts, CreditCards, Transactions, Installments, Meta

For privacy, consider using "Anyone with the link" only if you understand
the access implications, or deploy within your Google Workspace domain.
*/

const SHEETS = {
  Accounts: ["name","type","institution","opening"],
  CreditCards: ["name","bank","limit","dueDay"],
  Transactions: ["id","date","type","account","category","description","amount","cleared"],
  Installments: ["id","card","description","purchaseDate","amount","down","term","monthly","paid","nextDue","status"],
  Meta: ["key","value"]
};

function doGet(e) {
  try {
    if ((e.parameter.action || "get") === "get") {
      return json_(readState_());
    }
    return json_({ok:true, message:"Finance Tracker API is running"});
  } catch(err) {
    return json_({ok:false,error:String(err)});
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "replace") {
      replaceState_(body.data || {});
      return json_({ok:true});
    }
    return json_({ok:false,error:"Unknown action"});
  } catch(err) {
    return json_({ok:false,error:String(err)});
  }
}

function getSS_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function ensureSheets_() {
  const ss = getSS_();
  Object.keys(SHEETS).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.getRange(1,1,1,SHEETS[name].length).setValues([SHEETS[name]]);
  });
}

function replaceState_(data) {
  ensureSheets_();
  writeArray_("Accounts", (data.accounts||[]).map(x=>[x.name,x.type,x.institution,x.opening]));
  writeArray_("CreditCards", (data.cards||[]).map(x=>[x.name,x.bank,x.limit,x.dueDay]));
  writeArray_("Transactions", (data.transactions||[]).map(x=>[x.id||Utilities.getUuid(),x.date,x.type,x.account,x.category,x.description,x.amount,x.cleared]));
  writeArray_("Installments", (data.installments||[]).map(x=>[x.id||Utilities.getUuid(),x.card,x.description,x.purchaseDate,x.amount,x.down,x.term,x.monthly,x.paid,x.nextDue,x.status]));
  const sh=getSS_().getSheetByName("Meta");
  clearData_(sh);
  sh.getRange(2,1,1,2).setValues([["lastSync",new Date().toISOString()]]);
}

function writeArray_(name, rows) {
  const sh=getSS_().getSheetByName(name);
  clearData_(sh);
  if (rows.length) sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
}

function clearData_(sh) {
  if (sh.getLastRow()>1) sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).clearContent();
}

function readState_() {
  ensureSheets_();
  const rows=(name)=>{
    const sh=getSS_().getSheetByName(name);
    if(sh.getLastRow()<2) return [];
    return sh.getRange(2,1,sh.getLastRow()-1,SHEETS[name].length).getValues();
  };
  return {
    ok:true,
    data:{
      accounts:rows("Accounts").map(r=>({name:r[0],type:r[1],institution:r[2],opening:Number(r[3]||0)})),
      cards:rows("CreditCards").map(r=>({name:r[0],bank:r[1],limit:Number(r[2]||0),dueDay:r[3]})),
      transactions:rows("Transactions").map(r=>({id:r[0],date:dateString_(r[1]),type:r[2],account:r[3],category:r[4],description:r[5],amount:Number(r[6]||0),cleared:r[7]})),
      installments:rows("Installments").map(r=>({id:r[0],card:r[1],description:r[2],purchaseDate:dateString_(r[3]),amount:Number(r[4]||0),down:Number(r[5]||0),term:Number(r[6]||0),monthly:Number(r[7]||0),paid:Number(r[8]||0),nextDue:dateString_(r[9]),status:r[10]}))
    }
  };
}

function dateString_(v) {
  if (!v) return "";
  if (Object.prototype.toString.call(v)==="[object Date]") return Utilities.formatDate(v,Session.getScriptTimeZone(),"yyyy-MM-dd");
  return String(v).slice(0,10);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
