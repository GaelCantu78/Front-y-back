package com.miempresa.backend.loginController;

import com.miempresa.backend.model.User;
import com.miempresa.backend.service.LoginService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        String message = loginService.register(user);
        String status = message.contains("éxito") ? "ok" : "error";
        return Map.of("status", status, "message", message);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String message = loginService.login(email, password);
        String status = message.contains("exitoso") ? "ok" : "error";
        String token = status.equals("ok") ? "123456" : "";
        return Map.of("status", status, "message", message, "token", token);
    }
}

