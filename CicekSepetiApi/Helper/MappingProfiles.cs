using AutoMapper;
using CicekSepetiApi.Dtos;
using CicekSepetiApi.Models;

namespace CicekSepetiApi.Helper
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles() 
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();
            CreateMap<User, UserDto>();
            CreateMap<Category,CategoryDto>();
            CreateMap<CategoryDto, Category>();
            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();
            CreateMap<User,LoginDto>();
            CreateMap<LoginDto, User>();
            CreateMap<RegisteredUserDto, User>();
            CreateMap<User, RegisteredUserDto>();
            CreateMap<User, UserListDto>();
            CreateMap<UserListDto, User>();
            CreateMap<Cart,CartDto>();
            CreateMap<CartDto, Cart>();
            CreateMap<UserRoleDto,UserRole>();
            CreateMap<UserRole,UserRoleDto>();
        }
    }
}
