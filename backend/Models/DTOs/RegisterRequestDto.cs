using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class RegisterRequestDto
    {
        [Required(ErrorMessage = "Ім'я є обов'язковим")]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email є обов'язковим")]
        [EmailAddress(ErrorMessage = "Некоректний формат Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Пароль є обов'язковим")]
        [MinLength(8, ErrorMessage = "Пароль має бути мінімум 8 символів")]
        public string Password { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Телефон є обов'язковим")]
        public string Phone { get; set; } = string.Empty;
    }
}