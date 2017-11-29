export const TYPE = {
    UserRepository: Symbol.for("Repository<User>"),
    PostRepository: Symbol.for("Repository<Post>"),
    CommentRepository: Symbol.for("Repository<Comment>"),
    RoleRepository: Symbol.for("Repository<RoleRepository>"),
    UserRoleRepository: Symbol.for("Repository<UserRole>")
};

export const MIDDLEWARE = {
    IsInRoleAdmin: Symbol.for("IsInRoleAdmin"),
    IsAuthenticated: Symbol.for("IsAuthenticated"),
    Log: Symbol.for("Log")
};
