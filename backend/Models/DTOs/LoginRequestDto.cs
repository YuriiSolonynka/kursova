using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "Email є обов'язковим")]
        [EmailAddress(ErrorMessage = "Некоректний формат Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Пароль є обов'язковим")]
        public string Password { get; set; } = string.Empty;
    }
}