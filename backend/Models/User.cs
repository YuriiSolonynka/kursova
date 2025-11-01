using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace backend.Models
{
    public abstract class User
    {
        public int Id { get; private set; }
        public string Email { get; private set; } = string.Empty;
        public string Name { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public string PasswordHash { get; private set; } = string.Empty;

        public void SetPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("Пароль не може бути пустим.");
            }

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(bytes);
                this.PasswordHash = Convert.ToBase64String(hashBytes);
            }
        }

        public bool CheckPassword(string password)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(this.PasswordHash))
            {
                return false;
            }

            string newHash;
            
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(bytes);
                newHash = Convert.ToBase64String(hashBytes);
            }
            
            return this.PasswordHash == newHash;
        }
        
        public void UpdateEmail(string newEmail)
        {
            if (string.IsNullOrWhiteSpace(newEmail) || !newEmail.Contains("@"))
            {
                throw new ArgumentException("Некоректний формат Email.");
            }
            this.Email = newEmail;
        }

        public void UpdateName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName) || newName.Length < 2)
            {
                throw new ArgumentException("Ім'я має бути щонайменше 2 символи.");
            }
            this.Name = newName;
        }

        public void UpdatePhone(string newPhone)
        {
            if (string.IsNullOrWhiteSpace(newPhone))
            {
                throw new ArgumentException("Номер телефону не може бути пустим.");
            }
            this.Phone = newPhone;
        }
    }
}