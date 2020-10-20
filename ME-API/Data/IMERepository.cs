using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ME_API.Data
{
    public interface IMERepository<T> where T : class
    {
        T FindById(object id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<bool> SaveAll();
        IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    }
}