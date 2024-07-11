package com.alibaba.nacos.console.controller;

import com.alibaba.nacos.auth.annotation.Secured;
import com.alibaba.nacos.common.model.RestResult;
import com.alibaba.nacos.common.model.RestResultUtils;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/console/jasypt")
public class JasyptController {

    private StringEncryptor encryptor;

    @Autowired
    public JasyptController(StringEncryptor encryptor) {
        this.encryptor = encryptor;
    }

    @PostMapping(value = "/enc")
    @Secured
    public RestResult<String> enc(EncRequest encRequest) {
        String enc = encryptor.encrypt(encRequest.getContent());
        return RestResultUtils.success(enc);
    }

    static class EncRequest {
        private String content;

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
