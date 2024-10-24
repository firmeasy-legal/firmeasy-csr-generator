use openssl::{base64, hash::MessageDigest, pkey::PKey, rsa::Rsa, x509::X509ReqBuilder};
use serde::Serialize;

#[derive(Serialize)]
pub struct PrivateKeyWithCSR {
    base64_private_key_pem: String,
    base64_csr_pem: String,
}

#[derive(Serialize)]
pub struct GenerationError {
    message: String,
}

#[tauri::command]
pub fn generate_csr() -> Result<PrivateKeyWithCSR, GenerationError> {
    let key_pair_res = Rsa::generate(2048);
    if let Err(e) = key_pair_res {
        let error = GenerationError {
            message: format!("Error generating key pair: {}", e),
        };
        return Err(error);
    }

    let key_pair = key_pair_res.unwrap();

    let private_key_res = PKey::from_rsa(key_pair);
    if let Err(e) = private_key_res {
        let error = GenerationError {
            message: format!("Error obtaining private key: {}", e),
        };
        return Err(error);
    }

    let private_key = private_key_res.unwrap();

    let csr_builder_res = X509ReqBuilder::new();
    if let Err(e) = csr_builder_res {
        let error = GenerationError {
            message: format!("Error creating CSR builder: {}", e),
        };
        return Err(error);
    }

    let mut csr_builder = csr_builder_res.unwrap();

    let assigned_public_key_res = csr_builder.set_pubkey(&private_key);
    if let Err(e) = assigned_public_key_res {
        let error = GenerationError {
            message: format!("Error setting public key: {}", e),
        };
        return Err(error);
    }

    let signed_csr = csr_builder.sign(&private_key, MessageDigest::sha256());
    if let Err(e) = signed_csr {
        let error = GenerationError {
            message: format!("Error signing CSR: {}", e),
        };
        return Err(error);
    }

    let csr = csr_builder.build();

    let private_key_pem_res = private_key.private_key_to_pem_pkcs8();
    if let Err(e) = private_key_pem_res {
        let error = GenerationError {
            message: format!("Error converting private key to PEM: {}", e),
        };
        return Err(error);
    }

    let csr_pem_res = csr.to_pem();
    if let Err(e) = csr_pem_res {
        let error = GenerationError {
            message: format!("Error converting CSR to PEM: {}", e),
        };
        return Err(error);
    }

    let private_key_pem = private_key_pem_res.unwrap();
    let csr_pem = csr_pem_res.unwrap();

    let base64_private_key_pem = base64::encode_block(&private_key_pem);
    let base64_csr_pem = base64::encode_block(&csr_pem);

    let result = PrivateKeyWithCSR {
        base64_private_key_pem,
        base64_csr_pem,
    };

    Ok(result)
}
