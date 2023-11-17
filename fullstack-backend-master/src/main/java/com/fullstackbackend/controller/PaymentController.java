package com.fullstackbackend.controller;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fullstackbackend.model.*;
import com.paytm.pg.merchant.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PaymentController {

    @Autowired
    private PaytmDetails paytmDetails;
    @Autowired
    private Environment env;

    @PostMapping("/pgredirect/{customerId}/{transactionAmount}/{orderId}")
    public ResponseEntity<Map<String, String>> getRedirect(
            @PathVariable String customerId,
            @PathVariable String transactionAmount,
            @PathVariable String orderId) throws Exception {
        System.out.println(customerId);
        System.out.println(transactionAmount);
        System.out.println(orderId);
        System.out.println(env.getProperty("paytm.mobile"));
        System.out.println(env.getProperty("paytm.email"));
        TreeMap<String, String> parameters = new TreeMap<>();
        paytmDetails.getDetails().forEach((k, v) -> parameters.put(k, v));
        parameters.put("MOBILE_NO", env.getProperty("paytm.mobile"));
        parameters.put("EMAIL", env.getProperty("paytm.email"));
        parameters.put("ORDER_ID", orderId);
        parameters.put("TXN_AMOUNT", transactionAmount);
        parameters.put("CUST_ID", customerId);
        String checkSum = getCheckSum(parameters);
        parameters.put("CHECKSUMHASH", checkSum);

        return ResponseEntity.ok(parameters);
    }


    @PostMapping("/pgresponse")
    public ResponseEntity<Map<String, String>> getResponse(
            @RequestBody Map<String, String> responseData) throws Exception {

        String paytmChecksum = responseData.get("CHECKSUMHASH");
        boolean isValideChecksum = validateCheckSum(responseData, paytmChecksum);

        Map<String, String> response = new HashMap<>();
        response.put("result", isValideChecksum ? "Payment Successful" : "Payment Failed");

        return ResponseEntity.ok(response);
    }

    private boolean validateCheckSum(Map<String, String> parameters, String paytmChecksum) throws Exception {
    	System.out.println("Inside vchecksum");
        return PaytmChecksum.verifySignature((TreeMap<String, String>) parameters, paytmDetails.getMerchantKey(), paytmChecksum);
    }

    private String getCheckSum(TreeMap<String, String> parameters) throws Exception {
    	System.out.println("Inside checksum");
        return PaytmChecksum.generateSignature(parameters, paytmDetails.getMerchantKey());
    }
}
