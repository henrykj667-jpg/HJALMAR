import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://yxzigqyzqfbhojxyqxis.supabase.co";
const SUPABASE_KEY = "sb_publishable_4Dw3gljL_iBWEWPvAgaCjQ_ynTS4o8m";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let CURRENT_HOUSE_ID = null;

// ================= ADMIN =================
const MASTER_ADMIN_PIN = "9999"; // ändra till vad du vill

window.unlockAdmin = function () {
  const pin = document.getElementById("adminLoginPin").value.trim();

  if (pin !== MASTER_ADMIN_PIN) {
    document.getElementById("adminLoginStatus").innerText =
      "❌ Fel admin-PIN";
    return;
  }

  document.getElementById("adminPanel").style.display = "block";
  document.getElementById("adminLoginStatus").innerText =
    "✅ Admin upplåst";
};

window.createHouse = async function () {
 const companyName = document
  .getElementById("companyName")
  .value
  .trim();
 
  const address = document.getElementById("adminAddress").value.trim();
  const pin = document.getElementById("adminPin").value.trim();

  if (!address || !pin) {
    document.getElementById("adminStatus").innerText =
      "Fyll i adress och admin-PIN";
    return;
  }

  const { data, error } = await supabase
    .from("houses")
    .insert([{
  company_name: companyName || null,
  address,
  admin_pin: pin
}])

    .select()
    .single();

  if (error) {
    console.error(error);
    document.getElementById("adminStatus").innerText =
      "❌ Kunde inte skapa fastighet";
    return;
  }

  CURRENT_HOUSE_ID = data.id;
  document.getElementById("adminStatus").innerText =
    `✅ Fastighet skapad: ${data.address}`;
};

// ================= HYRESGÄSTER =================
window.addTenant = async function () {
  const name = document.getElementById("tenantName").value.trim();
  const pin = document.getElementById("tenantPin").value.trim();

  if (!CURRENT_HOUSE_ID) {
    alert("Ingen fastighet vald");
    return;
  }

  if (!name || !pin) {
    alert("Fyll i namn och PIN");
    return;
  }

  const { error } = await supabase
    .from("tenants")
    .insert([{ name, pin, house_id: CURRENT_HOUSE_ID }]);

  if (error) {
    console.error(error);
    alert("Fel vid sparande – kolla Console");
    return;
  }

  document.getElementById("tenantList").innerHTML += `<li>${name}</li>`;
  document.getElementById("tenantName").value = "";
  document.getElementById("tenantPin").value = "";
};

// ================= BOKNING =================
window.book = async function () {
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const pin  = document.getElementById("pin").value.trim();

  if (!name || !date || !time || !pin) {
    document.getElementById("status").innerText = "Fyll i alla fält 🙂";
    return;
  }

  if (!CURRENT_HOUSE_ID) {
    document.getElementById("status").innerText = "❌ Ingen fastighet vald";
    return;
  }

  const { data: tenants } = await supabase
    .from("tenants")
    .select("id")
    .eq("name", name)
    .eq("pin", pin)
    .eq("house_id", CURRENT_HOUSE_ID);

  if (!tenants || tenants.length === 0) {
    document.getElementById("status").innerText = "❌ Fel namn eller PIN";
    return;
  }

  const tenant_id = tenants[0].id;
  const [start_time, end_time] = time.split("-");

  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("date", date)
    .eq("start_time", start_time)
    .eq("house_id", CURRENT_HOUSE_ID);

  if (existing.length > 0) {
    document.getElementById("status").innerText = "❌ Tiden är redan bokad";
    return;
  }

  await supabase.from("bookings").insert([
    { name, date, start_time, end_time, tenant_id, house_id: CURRENT_HOUSE_ID }
  ]);

  document.getElementById("status").innerText =
    `✅ ${name} bokade ${start_time}–${end_time}`;
};
