use serde::Serialize;

#[derive(Serialize)]
pub struct PrivateKeyWithCSR {
    base64_private_key_pem: String,
    base64_csr_pem: String,
}

#[tauri::command]
pub fn generate_csr() -> PrivateKeyWithCSR {
    let result = PrivateKeyWithCSR {
        base64_private_key_pem: "private_key".to_string(),
        base64_csr_pem: "csr".to_string(),
    };

    result
}
