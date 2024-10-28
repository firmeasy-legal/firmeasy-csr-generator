use openssl::{
    base64,
    hash::MessageDigest,
    nid::Nid,
    pkey::PKey,
    rsa::Rsa,
    x509::{X509NameBuilder, X509ReqBuilder},
};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct PrivateKeyWithCSR {
    base64_private_key_pem: String,
    base64_csr_pem: String,
}

#[derive(Serialize)]
pub struct GenerationError {
    message: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CSRGenerationParams {
    country: String,
    state: String,
    locality: String,
    organization: String,
    organization_unit: String,
    common_name: String,
}

#[tauri::command]
pub fn generate_csr(data: CSRGenerationParams) -> Result<PrivateKeyWithCSR, GenerationError> {
    let key_pair_res = Rsa::generate(2048);
    if let Err(_) = key_pair_res {
        let error = GenerationError {
            message: "No se pudo generar el par de claves".to_string(),
        };
        return Err(error);
    }

    let key_pair = key_pair_res.unwrap();

    let private_key_res = PKey::from_rsa(key_pair);
    if let Err(_) = private_key_res {
        let error = GenerationError {
            message: "No se pudo extraer la private key".to_string(),
        };
        return Err(error);
    }

    let private_key = private_key_res.unwrap();

    let csr_builder_res = X509ReqBuilder::new();
    if let Err(_) = csr_builder_res {
        let error = GenerationError {
            message: "No se pudo crear el generador de CSRs".to_string(),
        };
        return Err(error);
    }

    let mut csr_builder = csr_builder_res.unwrap();

    let assigned_public_key_res = csr_builder.set_pubkey(&private_key);
    if let Err(_) = assigned_public_key_res {
        let error = GenerationError {
            message: "No se pudo asignar la llave pública al CSR".to_string(),
        };
        return Err(error);
    }

    let subject_name_builder_res = X509NameBuilder::new();

    if let Err(_) = subject_name_builder_res {
        let error = GenerationError {
            message: "No se pudo crear el generador de nombres".to_string(),
        };
        return Err(error);
    }

    let mut subject_name_builder = subject_name_builder_res.unwrap();

    let add_country_res = subject_name_builder.append_entry_by_nid(Nid::COUNTRYNAME, &data.country);
    if let Err(_) = add_country_res {
        let error = GenerationError {
            message: "No se pudo agregar el país al CSR".to_string(),
        };
        return Err(error);
    }

    let add_state_res =
        subject_name_builder.append_entry_by_nid(Nid::STATEORPROVINCENAME, &data.state);
    if let Err(_) = add_state_res {
        let error = GenerationError {
            message: "No se pudo agregar el estado al CSR".to_string(),
        };
        return Err(error);
    }

    let add_locality_res =
        subject_name_builder.append_entry_by_nid(Nid::LOCALITYNAME, &data.locality);
    if let Err(_) = add_locality_res {
        let error = GenerationError {
            message: "No se pudo agregar la localidad al CSR".to_string(),
        };
        return Err(error);
    }

    let add_organization_res =
        subject_name_builder.append_entry_by_nid(Nid::ORGANIZATIONNAME, &data.organization);

    if let Err(_) = add_organization_res {
        let error = GenerationError {
            message: "No se pudo agregar la organización al CSR".to_string(),
        };
        return Err(error);
    }

    let add_organization_unit_res = subject_name_builder
        .append_entry_by_nid(Nid::ORGANIZATIONALUNITNAME, &data.organization_unit);
    if let Err(_) = add_organization_unit_res {
        let error = GenerationError {
            message: "No se pudo agregar la unidad organizacional al CSR".to_string(),
        };
        return Err(error);
    }

    let add_common_name_res =
        subject_name_builder.append_entry_by_nid(Nid::COMMONNAME, &data.common_name);
    if let Err(_) = add_common_name_res {
        let error = GenerationError {
            message: "No se pudo agregar el nombre común al CSR".to_string(),
        };
        return Err(error);
    }

    let subject_name = subject_name_builder.build();

    let add_subject_name_res = csr_builder.set_subject_name(&subject_name);
    if let Err(_) = add_subject_name_res {
        let error = GenerationError {
            message: "No se pudo agregar el nombre del sujeto al CSR".to_string(),
        };
        return Err(error);
    }

    let signed_csr = csr_builder.sign(&private_key, MessageDigest::sha256());
    if let Err(_) = signed_csr {
        let error = GenerationError {
            message: "No se pudo firmar el CSR".to_string(),
        };
        return Err(error);
    }

    let csr = csr_builder.build();

    let private_key_pem_res = private_key.private_key_to_pem_pkcs8();
    if let Err(_) = private_key_pem_res {
        let error = GenerationError {
            message: "No se pudo convertir la private key al formato PEM".to_string(),
        };
        return Err(error);
    }

    let csr_pem_res = csr.to_pem();
    if let Err(_) = csr_pem_res {
        let error = GenerationError {
            message: "No se pudo convertir el CSR a formato PEM".to_string(),
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
