package com.miempresa.backend.service;

import java.util.HashMap;
import java.util.Map;
import com.miempresa.backend.model.User;
import com.miempresa.backend.repository.UserRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    public String register(User user){
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if(existing.isPresent()){
            return "Correo ya registrado";
        }
        userRepository.save(user);
        return "Usuario registrado con éxito";
    }

    // Login
    public String login(String email, String password){
        Optional<User> existing = userRepository.findByEmail(email);
        if(existing.isPresent() && existing.get().getPassword().equals(password)){
            return "Login exitoso";
        }
        return "Correo o contraseña incorrectos";
    }

    // Obtener usuario
    public User getUser(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
}