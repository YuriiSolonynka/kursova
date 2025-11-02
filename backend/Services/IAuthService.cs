using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterRequestDto requestDto);
        Task<string> LoginAsync(LoginRequestDto requestDto);
    }
}