using AutoMapper;
using DD.Common.Security.Model;
using DD.WebAPI.Dtos;

namespace DD.WebAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}